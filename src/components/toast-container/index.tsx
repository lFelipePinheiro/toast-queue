import { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { useToast } from "../../contexts/toastContext";

const ToastContainer = () => {
  const { containerRef } = useToast();
  return <StyledContainer ref={containerRef} />;
};

const StyledContainer = styled("div", {
  display: "flex",
  overflow: "hidden",
  paddingBottom: 55,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
  "@bp1": {
    top: "unset",
    bottom: 0,
    alignItems: "end",
    paddingTop: 55,
  },
});

export default ToastContainer;
