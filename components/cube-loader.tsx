"use client";

import React from "react";

const CubeSpinner: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="cube-loader">
        <div className="cube"></div>
        <div className="cube"></div>
      </div>
    </div>
  );
};

export default CubeSpinner;
