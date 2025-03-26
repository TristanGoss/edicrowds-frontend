// Shared category levels that better reflect what you actually see on a pavement
export const PEDESTRIAN_DENSITY_CATEGORIES = [
  {
    lowerThresholdPPSM: 0,
    upperThresholdPPSM: 0.03,
    label: "Empty",
    colour: "#4aa8ff",
    description: "Almost no one. Feels deserted. Empty residential streets, industrial zones, or parks in bad weather."
  },
  {
    lowerThresholdPPSM: 0.03,
    upperThresholdPPSM: 0.1,
    label: "Quiet",
    colour: "#3adb76",
    description: "Quiet but active. Occasional well-spaced out pedestrians. You rarely need to alter your course. Suburban roads or quiet shopping streets."
  },
  {
    lowerThresholdPPSM: 0.1,
    upperThresholdPPSM: 0.25,
    midPointPPSM: 0.8,
    label: "Busy",
    colour: "#f7e03c",
    description: "Genuinely busy. Regular interactions, occasional dodging. Typical of popular streets, small festivals, or busy squares."
  },
  {
    lowerThresholdPPSM: 0.25,
    upperThresholdPPSM: 0.5,
    label: "Crowded",
    colour: "#f95f0f",
    description: "Movement is constrained. People regularly cross paths, brief blockages happen. A central high street on a midsummer lunchtime."
  },
  {
    lowerThresholdPPSM: 0.5,
    upperThresholdPPSM: 1,
    label: "Congested",
    colour: "#e10600",
    description: "Freedom of movement is compromised. Feels dense. Typically temporary: festival gates, marches, or major street events."
  },
];

export function categorisePedestrianDensity(pedestrianDensityPPSM: number) {
  for (let i = PEDESTRIAN_DENSITY_CATEGORIES.length - 1; i >= 0; i--) {
    if (pedestrianDensityPPSM >= PEDESTRIAN_DENSITY_CATEGORIES[i].lowerThresholdPPSM) {
      return PEDESTRIAN_DENSITY_CATEGORIES[i];
    }
  }
  return PEDESTRIAN_DENSITY_CATEGORIES[0];
}
