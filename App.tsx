// App.tsx
import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from './src/theme/ThemeContext';
import { TodoScreen } from './src/screens/TodoScreen';

// Use your production Convex URL
const convex = new ConvexReactClient('https://compassionate-ocelot-616.convex.cloud');

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <TodoScreen />
      </ThemeProvider>
    </ConvexProvider>
  );
}