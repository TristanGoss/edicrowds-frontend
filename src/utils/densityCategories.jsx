// Shared category levels that better reflect what you actually see on a pavement
export const PEDESTRIAN_DENSITY_CATEGORIES = [
  {
    lowerThresholdPPSM: 0,
    upperThresholdPPSM: 0.05,
    label: "Empty",
    colour: "#141d2b",
    description: "Almost no one present. Long stretches between people."
  },
  {
    lowerThresholdPPSM: 0.05,
    upperThresholdPPSM: 0.15,
    label: "Sparse",
    colour: "#1e3a5f",
    description: "A few people in view. You won't need to pay attention to them to walk."
  },
  {
    lowerThresholdPPSM: 0.15,
    upperThresholdPPSM: 0.3,
    midPointPPSM: 0.8,
    label: "Light",
    colour: "#1f6f8b",
    description: "Steady trickle. Awareness of others begins."
  },
  {
    lowerThresholdPPSM: 0.3,
    upperThresholdPPSM: 0.5,
    label: "Moderate",
    colour: "#3fb98c",
    description: "Shared space. Occasional path adjustments."
  },
  {
    lowerThresholdPPSM: 0.5,
    upperThresholdPPSM: 0.75,
    label: "Busy",
    colour: "#f8961e",
    description: "Movement affected by others. You navigate actively."
  },
  {
    lowerThresholdPPSM: 0.75,
    upperThresholdPPSM: 1,
    label: "Dense",
    colour: "#f94144",
    description: "Regular flow but constrained. Often need to slow/weave."
  },
];

export function categorisePedestrianDensity(pedestrianDensityPPSM) {
  for (let i = PEDESTRIAN_DENSITY_CATEGORIES.length - 1; i >= 0; i--) {
    if (pedestrianDensityPPSM >= PEDESTRIAN_DENSITY_CATEGORIES[i].lowerThresholdPPSM) {
      return PEDESTRIAN_DENSITY_CATEGORIES[i];
    }
  }
  return null;
}
