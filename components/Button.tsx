'use client'; // This makes the component a Client Component

import React from 'react';
import "../app/globals.css";


// components/Button.tsx
type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {text}
    </button>
  );
};

export default Button; // ✅ THIS LINE is important

  