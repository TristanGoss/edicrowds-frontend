import { useEffect, useRef, useCallback, useMemo } from "react";
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

export default function MapDisplay() {
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`;
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  // Clean up popup when component unmounts
  useEffect(() => {
    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, []);

  const handleMapClick = useCallback((event) => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap(); // Get current map instance

    // Query rendered features at the clicked point
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["pedestrian-density-fill"], // Must match the Layer ID
    });

    if (popupRef.current) {
      popupRef.current.remove();
    }

    if (features.length > 0) {
      const properties = features[0].properties;
      const lng = Number(properties.centroid_lon);
      const lat = Number(properties.centroid_lat);
      const pedDensity = Number(properties.pedestrian_density_ppsm);
      const los = levelOfServiceFromPedestrianDensity(pedDensity);

      // fake up update time as a placeholder
      const now = new Date();
      now.setMinutes(0, 0, 0); // round to start of hour

      const timePart = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      
      const datePart = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      const popup = new maplibregl.Popup({ closeOnClick: false })
        .setLngLat([lng, lat])
        .setHTML(`
          <strong>OA ${properties.code}</strong>
          <p>${timePart}, ${datePart}</p>
          <p>Master Postcode: ${properties.masterpc}</p>
          <p>Area: ${properties.hect} ha</p>
          <p>Ped. Density: ${pedDensity.toFixed(2)} ppm²</p>
          <p>Cat ${los.category} (${los.label})</p>
        `)
        .addTo(map);

      popupRef.current = popup;
    }
  }, []);

  const memoizedMap = useMemo(() => (
    <Map
      ref={mapRef}
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
    >
      {/* Tile Source */}
      <Source
        id="edinburgh_pedestrian_density"
        type="vector"
        tiles={[`https://tiles.edinburghcrowds.co.uk/maps/edinburgh_pedestrian_density/{z}/{x}/{y}.pbf?nocache=${Date.now()}`]}
        minzoom={10}
        maxzoom={16}
      >
        {/* Face fill */}
        <Layer
          id="pedestrian-density-fill"
          type="fill"
          source="edinburgh_pedestrian_density"
          source-layer="edinburgh_pedestrian_density"
          paint={{
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", "pedestrian_density_ppsm"],  // Use the new column name
              ...LEVEL_OF_SERVICE_CATEGORIES.flatMap((item) => [item.thresholdPPSM, item.colour])
            ],
            "fill-opacity": 0.6,  // Adjust transparency for better visibility
          }}
        />
        {/* Edges */}
        <Layer
          id="pedestrian-density-border"
          type="line"
          source="edinburgh_pedestrian_density"
          source-layer="edinburgh_pedestrian_density"
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
  ), [handleMapClick, mapStyle]);

  return <div className="flex-grow relative">{memoizedMap}</div>;
}
