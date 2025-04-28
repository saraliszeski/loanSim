import React from 'react';

export interface StringDisplayProps {
  text: string[];  // The prop 'text' should be an array of strings
}

const StringDisplay: React.FC<StringDisplayProps> = ({ text }) => {
  return (
    <div className="StringDisplay">
      { <h1> ****Total Payments: {text[0]}****
        <br />
        <br />

        ****{text[1]}****
        <br />
        <br />

       ****{text[2]}****
       <br />
       <br />

      </h1>
      }
    </div>
  );
};

export default StringDisplay;
