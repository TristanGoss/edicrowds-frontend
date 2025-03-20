import { useState, useRef, useCallback, useMemo } from "react";
import { Map, Source, Layer, Popup } from "react-map-gl/maplibre";
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

  // State for selected OA details
  const [popupInfo, setPopupInfo] = useState(null);

  const handleMapClick = useCallback((event) => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap(); // Get current map instance

    // Query rendered features at the clicked point
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["pedestrian-density-fill"], // Must match the Layer ID
    });

    if (features.length > 0) {
      const feature = features[0];

      setPopupInfo({
        code: feature.properties.code,
        masterpc: feature.properties.masterpc,
        hect: feature.properties.hect,
        pedestrian_density_ppsm: feature.properties.pedestrian_density_ppsm,
        lngLat: event.lngLat,
      });
    } else {
      // If clicked outside, reset the state
      setPopupInfo(null);
    }
  }, []);

  // Memoized Map component (prevents re-rendering)
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
              0, "#2DC937", // LOS A (≤ 0.3 ppsm) - Free-flow
              0.3, "#99CC00", // LOS B (0.3 - 0.43 ppsm) - Minor interactions
              0.43, "#E7B416", // LOS C (0.43 - 0.72 ppsm) - Some restrictions
              0.72, "#EB801B", // LOS D (0.72 - 1.08 ppsm) - Frequent stops
              1.08, "#CC3232", // LOS E (1.08 - 1.61 ppsm) - Near capacity
              1.61, "#660000" // LOS F (> 1.61 ppsm) - Severe congestion
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
      {/* Popup */}
      {popupInfo && (
        <Popup
          longitude={popupInfo.lngLat.lng}
          latitude={popupInfo.lngLat.lat}
          closeOnClick={false}
          onClose={() => {
            setPopupInfo(null);
          }}
          anchor="top"
        >
          <strong>OA {popupInfo.code}</strong>
          <p>Master Postcode: {popupInfo.masterpc}</p>
          <p>Area: {popupInfo.hect} ha</p>
          <p>Ped Density: {popupInfo.pedestrian_density_ppsm.toFixed(2)} ppsm</p>
        </Popup>
      )}
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
          <LegendItem color="#2DC937" label="Free-flow" />
          <LegendItem color="#99CC00" label="Minor interactions" />
          <LegendItem color="#E7B416" label="Some restrictions" />
          <LegendItem color="#EB801B" label="Frequent stops" />
          <LegendItem color="#CC3232" label="Near capacity" />
          <LegendItem color="#660000" label="Severe Congestion" />
        </div>
      </div>
    </Map>
  ), [handleMapClick, mapStyle, popupInfo]);

  return <div className="flex-grow relative">{memoizedMap}</div>;
}
