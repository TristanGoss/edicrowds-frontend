import { useRef, useState } from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import { PEDESTRIAN_DENSITY_CATEGORIES } from "../utils/densityCategories";
import type {
  Map as MapLibreMap,
  ErrorEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapLibreEvent,
  MapMouseEvent,
  Popup, 
  MapGeoJSONFeature} from 'maplibre-gl';
import { 
  FeatureState,
  LegendItem,
  NowcastDataRef,
  createMapPopup,
  fetchNowcastThenApplyToMap,
  applyNowcastToMap,
  StyledTooltip, 
  FeatureProperties } from "../utils/mapDisplayUtils";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapDisplay.css";


export default function MapDisplay() {
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`;
  const popupRef = useRef<Popup|null>(null);
  const nowcastDataRef: NowcastDataRef = useRef({});
  const nowcastPollIntervalRef = useRef<number|null>(null);

  // for detecting tile server and other map failures
  const [mapError, setMapError] = useState<string | null>(null);

  function handleMapData(event: MapSourceDataEvent | MapStyleDataEvent) {
    const map = event.target as MapLibreMap;
    if (event.dataType === 'source' && event.sourceId === 'edinburgh-oas-source') {

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

  function handleMapRemove(_: MapLibreEvent) {
    if (popupRef.current) {
      popupRef.current.remove();
    }
    if (nowcastPollIntervalRef.current) {
      clearInterval(nowcastPollIntervalRef.current);
    }
  };

  function handleMapClick(event: MapMouseEvent) {
    const map = event.target as MapLibreMap;

    // Query rendered features at the clicked point
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["edinburgh-oas-fill"], // Must match the Layer ID
    });

    // Remove any existing popup (this also closes the popup if the user clicks outside an OA)
    if (popupRef.current) {
      popupRef.current.remove();
    }

    if (features.length > 0) {
      const thisFeature: MapGeoJSONFeature = features[0]

      // Pedestrian density is dynamic, so we get that from the feature state
      const state = map.getFeatureState({
        source: "edinburgh-oas-source",
        sourceLayer: "edinburgh_oas",
        id: thisFeature.id,
      }) as FeatureState;

      // Abort if pedestrian density not yet available
      if (!state.pedestrianDensityPPSM) {
        return;
      }

      // Some properties are static, so we get those from the feature properties
      const props = thisFeature.properties as Record<string, unknown>;
      const typedProperties: FeatureProperties = {
        centroid_lon: Number(props.centroid_lon),
        centroid_lat: Number(props.centroid_lat),
        code: String(props.code),
        masterpc: String(props.masterpc),
        hect: Number(props.hect),
      };

      popupRef.current = createMapPopup(state, typedProperties, map);
    }
  };

  function handleMapError(e: ErrorEvent) {
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
        }}
        minZoom={10}
        maxZoom={16}
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
          tiles={[`https://backend.edinburghcrowds.co.uk/tiles/maps/edinburgh_oas/{z}/{x}/{y}.pbf`]}
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
                ...PEDESTRIAN_DENSITY_CATEGORIES.flatMap((item) => [
                  (item.lowerThresholdPPSM + item.upperThresholdPPSM) / 2,
                  item.colour])
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
          <strong>Pedestrian Density</strong>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {PEDESTRIAN_DENSITY_CATEGORIES.map((item) => (
              <StyledTooltip
                key={item.label}
                content={
                  <>
                    {item.lowerThresholdPPSM} p/m² to {item.upperThresholdPPSM} p/m².<br/> {item.description}
                  </>
                }>
                <span tabIndex={0}>
                  <LegendItem color={item.colour} label={item.label} />
                </span>
              </StyledTooltip>
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
