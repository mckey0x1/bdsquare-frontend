"use client";

type LoadingCubeProps = {
  CubeLoading: boolean;
};

const RedCubeSpinner = ({ CubeLoading }: LoadingCubeProps) => {
  if (!CubeLoading) return null;
  return (
    <div className="loading-overlay-red">
      <div className="cube-loader">
        <div className="cube"></div>
        <div className="cube"></div>
      </div>
    </div>
  );
};

export default RedCubeSpinner;
