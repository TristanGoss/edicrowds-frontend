import { act, render } from '@testing-library/react';
import BackgroundImage from '../../components/BackgroundImage';

let loadHandler: () => void;

beforeEach(() => {
  // @ts-expect-error override global Image
  globalThis.Image = class MockImage {
    set onload(fn: () => void) {
      loadHandler = fn;
    }
    set src(_url: string) {
      console.log('Mock image src set');
      
    }
  };
});

test('renders both background layers', () => {
  render(<BackgroundImage />);
  const imageLayer = document.querySelector('div[style*="edinburghCrowds.jpg"]') as HTMLDivElement;
  expect(imageLayer).toHaveClass('opacity-0');
});

test('shows image layer after image loads', () => {
  render(<BackgroundImage />);

  const imageLayer = document.querySelector('div[style*="edinburghCrowds.jpg"]') as HTMLDivElement;
  expect(imageLayer).toHaveClass('opacity-0');

  // Simulate image load
  console.log('Triggering image load...')
  act(() => {
    loadHandler();
  });
  console.log('Triggered')

  expect(imageLayer).toHaveClass('opacity-20');
});
