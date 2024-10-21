import { Html } from '@react-three/drei';
import React from 'react';

const Loader = () => {
  return (
    <Html
    as='div'
    center
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
      <div className="flex flex-col items-center justify-center">
        <div className="loader"></div>
      </div>
    </Html>
  );
};

export default Loader;
