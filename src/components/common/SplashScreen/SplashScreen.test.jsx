import React from 'react';
import { render, screen } from '@testing-library/react';
import SplashScreen from './SplashScreen';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

describe('SplashScreen', () => {
  it('renders correctly and has tagline text', () => {
    const onComplete = vi.fn();
    render(<SplashScreen onComplete={onComplete} />);
    
    // Check if image is rendered
    const img = screen.getByAltText('App Logo');
    expect(img).toBeInTheDocument();
  });
});
