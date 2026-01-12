"use client";

type LoadingOverlayProps = {
  OverlayLoading: boolean;
};

const LoadingOverlay = ({ OverlayLoading }: LoadingOverlayProps) => {
  if (!OverlayLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner-loader"></div>
    </div>
  );
};

export default LoadingOverlay;
