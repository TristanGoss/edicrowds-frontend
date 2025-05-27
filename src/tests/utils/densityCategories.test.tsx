import { categorisePedestrianDensity, PEDESTRIAN_DENSITY_CATEGORIES } from '../../utils/densityCategories';

test.each([
  [0, 'Empty'],
  [0.01, 'Empty'],
  [0.03, 'Quiet'],
  [0.05, 'Quiet'],
  [0.1, 'Busy'],
  [0.2, 'Busy'],
  [0.25, 'Crowded'],
  [0.4, 'Crowded'],
  [0.5, 'Congested'],
  [0.75, 'Congested'],
  [1.0, 'Congested'],
  [5.0, 'Congested'], // above all thresholds
])('categorises %f ppsm as %s', (ppsm, expectedLabel) => {
  const category = categorisePedestrianDensity(ppsm);
  expect(category.label).toBe(expectedLabel);
});

test('returns a valid category for very small negative values (defensive)', () => {
  const category = categorisePedestrianDensity(-0.01);
  expect(category).toBe(PEDESTRIAN_DENSITY_CATEGORIES[0]);
});

test('every category has a unique label and valid thresholds', () => {
  const labels = new Set();
  for (const cat of PEDESTRIAN_DENSITY_CATEGORIES) {
    expect(cat.lowerThresholdPPSM).toBeLessThan(cat.upperThresholdPPSM);
    expect(typeof cat.label).toBe('string');
    expect(labels.has(cat.label)).toBe(false);
    labels.add(cat.label);
  }
});
