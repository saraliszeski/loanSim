'use client'; // This makes the component a Client Component

import React from 'react';
import "../app/globals.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string; // Make className an optional prop
};

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
