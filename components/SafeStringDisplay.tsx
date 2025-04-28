import React, { Suspense } from 'react';

// Safe StringDisplay component with fallback
const SafeStringDisplay: React.FC<{ text: string }> = ({ text }) => {
  try {
    // Try rendering StringDisplay
    const StringDisplay = require('../components/StringDisplay').default;
    return <StringDisplay text={text} />;
  } catch (error) {
    console.error('Error loading StringDisplay:', error);
    return <div>Error loading StringDisplay component.</div>; // Fallback UI
  }
};

export default SafeStringDisplay;
