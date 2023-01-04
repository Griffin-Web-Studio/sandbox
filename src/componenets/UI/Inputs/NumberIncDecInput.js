// Input.js
import React from 'react';

export default function NumberIncDecInput(props) {
  const { value, onChange } = props;

  return <input type="number" value={value} onChange={onChange} readOnly />;
};