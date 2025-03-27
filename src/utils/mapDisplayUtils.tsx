import React from 'react';
import type { RefObject } from 'react';
import { categorisePedestrianDensity } from "./densityCategories";
import { Popup, Map } from 'maplibre-gl';
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Arrow as TooltipArrow,
} from "@radix-ui/react-tooltip";


export interface FeatureState {
  pedestrianDensityPPSM: number;
  timestampISO: string;
}


export type NowcastDataRef = RefObject<
  Record<number | string, FeatureState | undefined>
>;


export interface FeatureProperties {
  centroid_lon: number;
  centroid_lat: number;
  code: string;
  masterpc: string;
  hect: number;
}


interface StyledTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}


interface LegendItemProps {
  color: string;
  label: string;
}


export function StyledTooltip({ children, content }: StyledTooltipProps) {
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

export function LegendItem({ color, label }: LegendItemProps) {
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


export function createMapPopup(featureState: FeatureState, featureProperties: FeatureProperties, map: Map) {
  const category = categorisePedestrianDensity(featureState.pedestrianDensityPPSM);
  const updated: Date = new Date(featureState.timestampISO);

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

  return new Popup({ closeOnClick: false })
    .setLngLat([featureProperties.centroid_lon, featureProperties.centroid_lat])
    .setHTML(`
      <strong>OA ${featureProperties.code}</strong>
      <p>${timePart}, ${datePart}</p>
      <p>Master Postcode: ${featureProperties.masterpc}</p>
      <p>Area: ${featureProperties.hect} ha</p>
      <p>Ped. Density: ${featureState.pedestrianDensityPPSM.toFixed(2)} p/m²</p>
      <p>(${category.label})</p>
    `)
    .addTo(map);
}


export async function fetchNowcastThenApplyToMap(map: Map, nowcastDataRef: NowcastDataRef) {
  const response = await fetch('https://backend.edinburghcrowds.co.uk/engine/nowcast');
  if (!response.ok) throw new Error("Failed to fetch nowcast");
  nowcastDataRef.current = await response.json();

  // update the current map view with fresh data
  applyNowcastToMap(map, nowcastDataRef);
}


export function applyNowcastToMap(map: Map, nowcastDataRef: NowcastDataRef) {
  const features = map.querySourceFeatures('edinburgh-oas-source', {
    sourceLayer: 'edinburgh_oas',
  });

  for (const feature of features) {
    const id = feature.id;
    if (id === undefined) continue;

    map.setFeatureState(
      { source: 'edinburgh-oas-source', sourceLayer: 'edinburgh_oas', id },
      {
        pedestrianDensityPPSM: nowcastDataRef.current?.[id] ?? null,
        timestampISO: nowcastDataRef.current?.timestampISO ?? null
      }
    );
  }
}