import {Map, Source, Layer} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapDisplay() {
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`;

  return (
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
      style={{ width: "100%", height: "100vh" }}
      mapStyle={mapStyle}
      mapLib={import("maplibre-gl")}
    >
      {/* Postcode Tile Source */}
      <Source
        id="postcodes"
        type="vector"
        tiles={["http://tiles.edinburghcrowds.co.uk:8080/maps/edinburgh_postcodes/{z}/{x}/{y}.pbf"]}
        minzoom={10}
        maxzoom={16}
      >
        {/* Postcode Fill Layer */}
        <Layer
          id="postcodes-layer"
          type="fill"
          source="postcodes"
          source-layer="postcodes"
          paint={{
            "fill-color": "#FF0000",
            "fill-opacity": 0.5,
          }}
        />
        {/* Postcode Borders */}
        <Layer
          id="postcodes-border"
          type="line"
          source="postcodes"
          source-layer="postcodes"
          paint={{
            "line-color": "#000000",
            "line-width": 2,
          }}
        />
      </Source>
    </Map>
  );
}
