import { useRef, useState } from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import { LEVEL_OF_SERVICE_CATEGORIES, levelOfServiceFromPedestrianDensity } from "../utils/levelOfService";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapDisplay.css";


function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: color,
          borderRadius: "3px",
        }}
      />
      <span>{label}</span>
    </div>
  );
}


function createMapPopup(featureState, featureProperties, map) {
  const los = levelOfServiceFromPedestrianDensity(featureState.pedestrianDensityPPSM);
  const updated = new Date(featureState.lastUpdatedISO);

  const timePart = updated.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  const datePart = updated.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return new maplibregl.Popup({ closeOnClick: false })
    .setLngLat([featureProperties.centroid_lon, featureProperties.centroid_lat])
    .setHTML(`
      <strong>OA ${featureProperties.code}</strong>
      <p>${timePart}, ${datePart}</p>
      <p>Master Postcode: ${featureProperties.masterpc}</p>
      <p>Area: ${featureProperties.hect} ha</p>
      <p>Ped. Density: ${featureState.pedestrianDensityPPSM.toFixed(2)} ppm²</p>
      <p>Cat ${los.category} (${los.label})</p>
    `)
    .addTo(map);
}


async function fetchNowcastThenApplyToMap(map, nowcastDataRef) {
  try {
    const response = await fetch('https://this_url_does_not_exist_yet');
    if (!response.ok) throw new Error("Failed to fetch nowcast");
    nowcastDataRef.current = await response.json();
  } catch (err) {
    console.warn("Failed to retrieve nowcast, mocking with fake data");
    const response = await fetch('/mock_nowcast.json');
    if (!response.ok) throw new Error("Failed to fetch mocked nowcast");
    nowcastDataRef.current = await response.json();
  }

  // update the current map view with fresh data
  applyNowcastToMap(map, nowcastDataRef);
}


function applyNowcastToMap(map, nowcastDataRef) {
  const features = map.querySourceFeatures('edinburgh-oas-source', {
    sourceLayer: 'edinburgh_oas',
  });

  for (const feature of features) {
    const id = feature.id;
    if (id === undefined) continue;

    map.setFeatureState(
      { source: 'edinburgh-oas-source', sourceLayer: 'edinburgh_oas', id },
      {
        pedestrianDensityPPSM: nowcastDataRef.current?.[id]?.pedestrianDensityPPSM ?? null,
        lastUpdatedISO: nowcastDataRef.current?.[id]?.lastUpdatedISO ?? null
      }
    );
  }
}


export default function MapDisplay() {
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`;
  const popupRef = useRef(null);
  const nowcastDataRef = useRef(null);
  const nowcastPollIntervalRef = useRef(null);

  // for detecting tile server and other map failures
  const [mapError, setMapError] = useState(null);

  function handleMapData(event) {
    const map = event.target;
    if (event.sourceId === 'edinburgh-oas-source' && event.dataType === 'source') {

      // setup nowcast polling if not already setup
      if (!nowcastPollIntervalRef.current) {
        nowcastPollIntervalRef.current = setInterval(() => {
          fetchNowcastThenApplyToMap(map, nowcastDataRef);
        }, 900000)
        // fetch data once immediately
        fetchNowcastThenApplyToMap(map, nowcastDataRef);
      }

      // every time a new tile is loaded, ensure its features are updated
      applyNowcastToMap(map, nowcastDataRef);
    }
  };

  function handleMapRemove(event) {
    if (popupRef.current) {
      popupRef.current.remove();
    }
    if (nowcastPollIntervalRef.current) {
      clearInterval(nowcastPollIntervalRef);
    }
  };

  function handleMapClick(event) {
    const map = event.target;

    // Query rendered features at the clicked point
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["edinburgh-oas-fill"], // Must match the Layer ID
    });

    // Remove any existing popup (this also closes the popup if the user clicks outside an OA)
    if (popupRef.current) {
      popupRef.current.remove();
    }

    if (features.length > 0) {
      // Some properties are static, so we get those from the feature properties
      const properties = features[0].properties;
      
      // Pedestrian density is dynamic, so we get that from the feature state instead
      const state = map.getFeatureState({
        source: "edinburgh-oas-source",
        sourceLayer: "edinburgh_oas",
        id: features[0].id,
      });

      // Abort if pedestrian density not yet available
      if (!state.pedestrianDensityPPSM) {
        return;
      }

      popupRef.current = createMapPopup(state, properties, map);
    }
  };

  function handleMapError(e) {
    const message = e?.error?.message || "";
    if (message.includes("Failed to fetch")) {
      setMapError("Failed to fetch pedestrian density. The backend is probably down for maintenance, please try again later.");
    } else {
      // case otherwise
      setMapError("Failed to load the map. This is unexpected, please report this error to info@edinburghcrowds.co.uk.");
    }
    console.error(e);
  };

  return (
    <div className="flex-grow relative">
      <Map
        initialViewState={{
          latitude: 55.95, // Edinburgh
          longitude: -3.19,
          zoom: 12,
          minZoom: 10,
          maxZoom: 16,
        }}
        maxBounds={[
          [-3.37, 55.87], // Southwest corner (minLng, minLat)
          [-3.01, 56.01], // Northeast corner (maxLng, maxLat)
        ]}
        dragRotate={false}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapLib={import("maplibre-gl")}
        onClick={handleMapClick}
        onError={handleMapError}
        onRemove={handleMapRemove}
        onData={handleMapData}
      >
        {/* Tile Source - note that we have disabled caching to ease development */}
        <Source
          id="edinburgh-oas-source"
          type="vector"
          tiles={[`https://tiles.edinburghcrowds.co.uk/maps/edinburgh_oas/{z}/{x}/{y}.pbf`]}
          minzoom={10}
          maxzoom={16}
        >
          {/* OA Face fill */}
          <Layer
            id="edinburgh-oas-fill"
            type="fill"
            source="edinburgh-oas-source"
            source-layer="edinburgh_oas"
            paint={{
              "fill-color": [
                "interpolate",
                ["linear"],
                ["feature-state", "pedestrianDensityPPSM"],  // Use the new column name
                ...LEVEL_OF_SERVICE_CATEGORIES.flatMap((item) => [item.thresholdPPSM, item.colour])
              ],
              "fill-opacity": 0.6,  // Adjust transparency for better visibility
            }}
          />
          {/* OA Edges */}
          <Layer
            id="edinburgh-oas-border"
            type="line"
            source="edinburgh-oas-source"
            source-layer="edinburgh_oas"
            paint={{
              "line-color": "#000000",
              "line-width": 2,
            }}
          />
        </Source>
        {/* legend */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            fontSize: "12px",
          }}
        >
          <strong>Pedestrian Crowding</strong>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {LEVEL_OF_SERVICE_CATEGORIES.map((item) => (
              <LegendItem key={item.label} color={item.colour} label={item.label} />
            ))}
          </div>
        </div>
      </Map>
      {mapError && (
        <div className="absolute top-0 left-0 right-0 bg-red-700 text-white text-center py-2 z-50">
          {mapError}
        </div>
      )}
    </div>);
}
