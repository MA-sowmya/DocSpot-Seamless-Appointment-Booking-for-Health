import React from "react";
import { Spinner } from "react-bootstrap";
import { useLoading } from "../context/LoaderContext";

const LoaderComp = () => {
  const { loading } = useLoading();

  if (!loading) return null; // Don't show anything if not loading

  return (
    <div style={loaderStyle}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

// CSS for centering the loader
const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999, // Keep it on top
};

export default LoaderComp;
