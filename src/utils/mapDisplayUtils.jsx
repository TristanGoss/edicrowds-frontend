import { categorisePedestrianDensity } from "./densityCategories";
import maplibregl from 'maplibre-gl';
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Arrow as TooltipArrow,
} from "@radix-ui/react-tooltip";


export function StyledTooltip({ children, content }) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="left"
            sideOffset={10}
            style={{
              backgroundColor: "#1c1c1c",
              color: "white",
              padding: "6px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              maxWidth: "200px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              zIndex: 999,
            }}
          >
            {content}
            <TooltipArrow fill="#1c1c1c" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export function LegendItem({ color, label }) {
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


export function createMapPopup(featureState, featureProperties, map) {
  const category = categorisePedestrianDensity(featureState.pedestrianDensityPPSM);
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
      <p>(${category.label})</p>
    `)
    .addTo(map);
}


export async function fetchNowcastThenApplyToMap(map, nowcastDataRef) {
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


export function applyNowcastToMap(map, nowcastDataRef) {
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