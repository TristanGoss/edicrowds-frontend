// Shared Pedestrian Level of Service categories
export const LEVEL_OF_SERVICE_CATEGORIES = [
    { thresholdPPSM: 0, category: "A", label: "Free-flow", colour: "#2DC937" },
    { thresholdPPSM: 0.3, category: "B", label: "Minor interactions", colour: "#99CC00" },
    { thresholdPPSM: 0.43, category: "C", label: "Some restrictions", colour: "#E7B416" },
    { thresholdPPSM: 0.72, category: "D", label: "Frequent stops", colour: "#EB801B" },
    { thresholdPPSM: 1.08, category: "E", label: "Near capacity", colour: "#CC3232" },
    { thresholdPPSM: 1.61, category: "F", label: "Severe Congestion", colour: "#660000" },
  ];
  
export function levelOfServiceFromPedestrianDensity(pedestrianDensityPPSM) {
    for (let i = LEVEL_OF_SERVICE_CATEGORIES.length - 1; i >= 0; i--) {
        if (pedestrianDensityPPSM >= LEVEL_OF_SERVICE_CATEGORIES[i].thresholdPPSM) {
        return LEVEL_OF_SERVICE_CATEGORIES[i];
        }
    }
    return null; // Shouldn’t happen, but just in case
}
  