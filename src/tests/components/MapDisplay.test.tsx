import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MapDisplay from '../../components/MapDisplay';

// Prevent MapLibre from crashing the test environment
if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = vi.fn(() => 'blob:mock');
}

vi.mock('../../utils/mapDisplayUtils', () => ({
  Legend: () => <div>Legend</div>,
  HelpButton: () => <div>HelpButton</div>,
  BrailleSpinner: () => <div data-testid="spinner">Spinner</div>,
  fetchNowcastThenApplyToMap: vi.fn(() => Promise.resolve()),
  applyNowcastToMap: vi.fn(),
  createMapPopup: vi.fn(),
}));

vi.mock('react-map-gl/maplibre', () => ({
  Map: ({ children, onClick, onLoad, onError, onRemove, onData }: any) => (
    <div data-testid="mock-map">
      <button onClick={() => onClick({ target: { queryRenderedFeatures: () => [] } })}>click</button>
      <button onClick={() => onLoad()}>load</button>
      <button onClick={() => onError({ error: new Error('Boom') })}>error</button>
      <button onClick={() => onRemove()}>remove</button>
      <button onClick={() => onData({ dataType: 'source', sourceId: 'edinburgh-oas-source', target: { querySourceFeatures: () => [] } })}>data</button>
      {children}
    </div>
  ),
  Source: ({ children }: any) => <div data-testid="mock-source">{children}</div>,
  Layer: () => <div data-testid="mock-layer" />,
}));

test('renders MapDisplay and handles loading/error state', async () => {
  render(<MapDisplay />);

  // Initial loading
  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  // Trigger error
  fireEvent.click(screen.getByText('error'));
  expect(await screen.findByText(/Failed to load the map/)).toBeInTheDocument();

  // Spinner should disappear only if data loading is false
  fireEvent.click(screen.getByText('load'));
});