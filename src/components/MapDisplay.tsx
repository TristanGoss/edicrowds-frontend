import { useRef, useState } from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import { PEDESTRIAN_DENSITY_CATEGORIES } from "../utils/densityCategories";
import type {
  ErrorEvent,
  Map as MapLibreMap,
  MapGeoJSONFeature,
  MapLibreEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  Popup } from 'maplibre-gl';
import { 
  BrailleSpinner,
  FeatureProperties,
  FeatureState,
  HelpButton,
  Legend,
  NowcastDataRef,
  applyNowcastToMap,
  createMapPopup,
  fetchNowcastThenApplyToMap } from "../utils/mapDisplayUtils";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapDisplay.css";


export default function MapDisplay() {
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`;
  const popupRef = useRef<Popup|null>(null);
  const nowcastDataRef: NowcastDataRef = useRef({});
  const nowcastPollIntervalRef = useRef<number|null>(null);

  // for detecting tile server and other map failures
  const [mapError, setMapError] = useState<string | null>(null);

  // for detecting data and map loading
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [mapLoading, setMapLoading] = useState<boolean>(true);

  function handleMapData(event: MapSourceDataEvent | MapStyleDataEvent) {
    const map = event.target as MapLibreMap;
    if (event.dataType === 'source' && event.sourceId === 'edinburgh-oas-source') {

      // setup nowcast polling if not already setup
      if (!nowcastPollIntervalRef.current) {
        nowcastPollIntervalRef.current = setInterval(() => {
          fetchNowcastThenApplyToMap(map, nowcastDataRef).catch(
            (err: Error) => {
              setMapError(err.message);
              console.error(err.message);
            });
        }, 900000)  // every 15 minutes

        // fetch data once immediately and hide the loading bar only once it has loaded
        fetchNowcastThenApplyToMap(map, nowcastDataRef).then(
          () => {setDataLoading(false)}).catch(
            (err: Error) => {
              setDataLoading(false);
              setMapError(err.message);
              console.error(err.message);
            });
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
      if (state.pedestrianDensityPPSM === undefined) {
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
    setMapError(`Failed to load the map with error ${e.error.message}. \nThis is unexpected, please report this error to info@edinburghcrowds.co.uk.`);
    console.error(e.error.message);
  };

  return (
    <div className="flex-grow relative">
      <Map
        attributionControl={false}
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
        onLoad={() => setMapLoading(false)}
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
      </Map>
      <Legend />
      <HelpButton />
      {mapError && (
        <div className="map-error">
          {mapError}
        </div>
      )}
      {(dataLoading || mapLoading) && (
        <div className="map-loading">
          <BrailleSpinner /> Loading Nowcast, please wait...
        </div>
      )}
    </div>);
}
