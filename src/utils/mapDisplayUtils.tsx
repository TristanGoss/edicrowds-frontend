import { useEffect, useState } from 'react';
import React from 'react';
import type { RefObject } from 'react';
import { PEDESTRIAN_DENSITY_CATEGORIES, categorisePedestrianDensity } from "./densityCategories";
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


const BRAILLE_SPINNER_FRAMES = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];


export function StyledTooltip({ children, content }: StyledTooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="left"
            sideOffset={10}
            className="window-over-map max-w-xs"
          >
            {content}
            <TooltipArrow fill="#1c1c1c" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

export function Legend() {
  return (
    <>
      <div className="absolute bottom-5 right-5 window-over-map">
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
    </>
  )
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // timeout after 30s

  try {
    const response = await fetch('https://backend.edinburghcrowds.co.uk/engine/nowcast', {
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();  // get body as string
      throw new Error(`Failed to fetch nowcast: code ${response.status} - ${errorText}`);
    }

    nowcastDataRef.current = await response.json();

    // update the current map view with fresh data
    applyNowcastToMap(map, nowcastDataRef);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Failed to fetch nowcast: Timed Out after waiting 30s');
    }

    // Optionally rethrow with additional context
    if (err instanceof Error) {
      throw new Error(`Nowcast fetch failed: ${err.message}`);
    }

    // Final fallback for truly unknown cases
    throw new Error('Unknown error occurred while fetching nowcast');
  } finally {
    clearTimeout(timeout);
  }
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
        pedestrianDensityPPSM: nowcastDataRef.current?.[String(id)] ?? null,
        timestampISO: nowcastDataRef.current?.timestampISO ?? null
      }
    );
  }
}


export function BrailleSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % BRAILLE_SPINNER_FRAMES.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return <span>{BRAILLE_SPINNER_FRAMES[frame]}</span>;
}


export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="window-over-map hover:bg-blue-700 transition absolute bottom-[200px] right-5"
        onClick={() => setOpen(true)}
        title="Help"
      >
        <strong>Help</strong>
      </button>

      {open && (
        // outer div darkens the display
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="window-over-map max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Help</h2>
            <p className="mb-4 text-sm">
              This map shows the current pedestrian density across the city, produced by fusing together a number of different data sources.
              You can zoom and drag to explore different areas. The data automatically refreshes every 15 minutes.
            </p>
            <p className="mb-4 text-sm">
              You can click on each Observation Area (each coloured polygon) to get more information about it.
              The legend includes tooltips that present more information on the colour scale.
            </p>
            <hr className="my-2" />
            <p className="text-xs">
              {' '}<a href="https://maplibre.org/" className="no-wrap-link" target="_blank">MapLibre</a> | 
              {' '}<a href="https://maplibre.org/" className="no-wrap-link" target="_blank">© MapTiler</a> | 
              {' '}<a href="https://maplibre.org/" className="no-wrap-link" target="_blank">© OpenStreetMap contributors</a>
            </p>
            <button
              onClick={() => setOpen(false)}
              className="link-button mt-4 px-3 py-1 text-sm rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}