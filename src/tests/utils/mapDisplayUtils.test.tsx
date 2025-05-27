import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import {
  applyNowcastToMap,
  BrailleSpinner,
  createMapPopup,
  fetchNowcastThenApplyToMap,
  NowcastDataRef,
  HelpButton,
  Legend } from '../../utils/mapDisplayUtils';
import { PEDESTRIAN_DENSITY_CATEGORIES } from '../../utils/densityCategories';

test('renders all pedestrian density categories in legend', () => {
  render(<Legend />);
  for (const { label } of PEDESTRIAN_DENSITY_CATEGORIES) {
    expect(screen.getAllByText(label).length).toBeGreaterThan(0);
  }
});

test('BrailleSpinner cycles through frames', () => {
  vi.useFakeTimers(); // only fakes timers inside this test

  render(<BrailleSpinner />);
  const initial = screen.getByText(/⠋|⠙|⠹/);
  expect(initial).toBeInTheDocument();

  vi.advanceTimersByTime(80);
  const next = screen.getByText(/⠋|⠙|⠹|⠸|⠼|⠴|⠦|⠧|⠇|⠏/);
  expect(next).toBeInTheDocument();

  vi.useRealTimers(); // restore for any following test
});

test('Help modal opens and closes', () => {
  render(<HelpButton />);

  fireEvent.click(screen.getByRole('button', { name: /Help/i }));
  expect(screen.getByText(/This map shows the current pedestrian density/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Close/i }));
  expect(screen.queryByText(/This map shows the current pedestrian density/)).not.toBeInTheDocument();
});

test('createMapPopup builds correct HTML structure', () => {
  const map = { addControl: vi.fn() } as any;

  const featureState = {
    pedestrianDensityPPSM: 0.15,
    timestampISO: '2025-05-01T12:00:00Z'
  };

  const featureProperties = {
    centroid_lon: -3.2,
    centroid_lat: 55.95,
    code: 'S00012345',
    masterpc: 'EH1 1AA',
    hect: 0.5,
  };

  const popup = createMapPopup(featureState, featureProperties, map);
  const html = popup.getElement().innerHTML;

  expect(html).toContain('OA S00012345');
  expect(html).toContain('Ped. Density: 0.15 p/m²');
});

test('fetchNowcastThenApplyToMap applies data when successful', async () => {
  const nowcast = {
    1: 0.5,
    2: 0.3,
    timestampISO: '2025-01-01T12:00:00Z',
  };

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(nowcast),
    })
  ) as any;

  const mockMap = {
    querySourceFeatures: vi.fn(() => [
      { id: 1 },
      { id: 2 },
      { id: undefined }, // test undefined case too
    ]),
    setFeatureState: vi.fn(),
  };

  const ref: NowcastDataRef = { current: {} };

  await fetchNowcastThenApplyToMap(mockMap as any, ref);

  expect(ref.current).toEqual(nowcast);
  expect(mockMap.setFeatureState).toHaveBeenCalledTimes(2);
  expect(mockMap.setFeatureState).toHaveBeenCalledWith(
    { source: 'edinburgh-oas-source', sourceLayer: 'edinburgh_oas', id: 1 },
    { pedestrianDensityPPSM: 0.5, timestampISO: '2025-01-01T12:00:00Z' }
  );
  expect(mockMap.setFeatureState).toHaveBeenCalledWith(
    { source: 'edinburgh-oas-source', sourceLayer: 'edinburgh_oas', id: 2 },
    { pedestrianDensityPPSM: 0.3, timestampISO: '2025-01-01T12:00:00Z' }
  );
});

test('fetchNowcastThenApplyToMap throws on timeout', async () => {
  vi.useFakeTimers();

  // Simulate fetch that aborts when controller signal fires
  globalThis.fetch = vi.fn((_, { signal }: any) => {
    return new Promise((_, reject) => {
      signal.addEventListener('abort', () => {
        reject(new DOMException('Aborted', 'AbortError'));
      });
    });
  }) as any;

  const map = {
    querySourceFeatures: vi.fn(() => []),
    setFeatureState: vi.fn(),
  };
  const ref: NowcastDataRef = { current: {} };

  const promise = fetchNowcastThenApplyToMap(map as any, ref, 10);

  vi.advanceTimersByTime(11);

  await expect(promise).rejects.toThrow('Timed Out');

  vi.useRealTimers();
});

test('applyNowcastToMap sets feature state correctly', () => {
  const mockFeatures = [
    { id: 1 }, { id: 2 }, { id: undefined }
  ];

  const mockMap = {
    querySourceFeatures: vi.fn(() => mockFeatures),
    setFeatureState: vi.fn(),
  };

  const nowcastDataRef: NowcastDataRef = {
    current: {
      1: 0.2,
      2: 0.3,
      timestampISO: '2025-01-01T12:00:00Z',
    },
  };

  applyNowcastToMap(mockMap as any, nowcastDataRef);

  expect(mockMap.setFeatureState).toHaveBeenCalledTimes(2);
  expect(mockMap.setFeatureState).toHaveBeenCalledWith(
    { source: 'edinburgh-oas-source', sourceLayer: 'edinburgh_oas', id: 1 },
    {
      pedestrianDensityPPSM: 0.2,
      timestampISO: '2025-01-01T12:00:00Z'
    }
  );
});
