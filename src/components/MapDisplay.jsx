import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapDisplay() {
    const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`;
    return (
    <Map
      initialViewState={{
        latitude: 55.95,  // Edinburgh
        longitude: -3.19,
        zoom: 12,
        minZoom: 10,  // Prevent excessive zooming out
        maxZoom: 16   // Prevent zooming in too far
      }}
      maxBounds={[
        [-3.37, 55.87],  // Southwest corner (minLng, minLat)
        [-3.01, 56.01]   // Northeast corner (maxLng, maxLat)
      ]}
      dragRotate={false}
      style={{ width: "100%", height: "100vh" }}
      mapStyle={mapStyle}
      mapLib={import("maplibre-gl")}
    />)
  }