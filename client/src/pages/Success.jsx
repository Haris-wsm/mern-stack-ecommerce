import React from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const { state } = useLocation();
  console.log(state);
  return <div>Success</div>;
}

export default Success;
