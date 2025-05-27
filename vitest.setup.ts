import '@testing-library/jest-dom';

vi.mock('maplibre-gl', () => ({
  __esModule: true,
  default: {},
}));
