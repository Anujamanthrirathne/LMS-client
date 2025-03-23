// Providers.tsx
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';  // Import store

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>; // Use curly braces to pass `children`
}
