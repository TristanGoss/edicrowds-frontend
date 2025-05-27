import '@testing-library/jest-dom';
import { vi } from 'vitest';


vi.mock('maplibre-gl', () => {
  class MockPopup {
    html = '';
    lngLat: [number, number] = [0, 0];

    setHTML(html: string) {
      this.html = html;
      return this;
    }

    setLngLat(coords: [number, number]) {
      this.lngLat = coords;
      return this;
    }

    addTo(_map: any) {
      return this;
    }

    getElement() {
      // simulate a real DOM element for inspection
      const el = document.createElement('div');
      el.innerHTML = this.html;
      return el;
    }
  }

  return {
    Popup: MockPopup,
    Map: class {},
  };
});
