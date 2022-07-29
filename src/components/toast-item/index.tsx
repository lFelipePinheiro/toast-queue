import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { styled } from "../../../stitches.config";
import { ToastWithProps } from "../../contexts/toastContext";
import Timer from "../../utils/timer";
import ErrorIcon from "../error-icon";
import SuccessIcon from "../success-icon";

interface ToastProps extends ToastWithProps {
  onRemove(): void;
}

const ToastItem: FC<ToastProps> = ({ message, duration, type, onRemove }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const handleRemoveToast = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.classList.toggle("active");
      setTimeout(() => {
        onRemove();
      }, 500);
    }
  }, [onRemove]);

  const ownTimer = useMemo(() => {
    const newTimer = new Timer({
      callback: handleRemoveToast,
      delay: duration,
    });
    newTimer.resume();
    return newTimer;
  }, [duration, handleRemoveToast]);

  const handleOnMouseEnter = () => {
    ownTimer.pause();
  };

  const handleOnMouseLeave = () => {
    ownTimer.resume();
  };

  useEffect(() => {
    setTimeout(() => {
      toastRef.current?.classList.add("active");
    }, 300);
  }, []);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      default:
        return <ErrorIcon />;
    }
  };

  return (
    <StyledToastContainer
      ref={toastRef}
      type={type}
      onClick={handleRemoveToast}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div />
      {getIcon()}
      <ToastMessage>{message}</ToastMessage>
    </StyledToastContainer>
  );
};

const StyledToastContainer = styled("div", {
  position: "relative",
  cursor: "pointer",
  top: 0,
  right: "-800px",
  margin: 0,
  display: "flex",
  alignItems: "center",
  width: "344px",
  filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.161))",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "all 150ms linear, height 150ms linear 5s",
  height: "0px",
  "&.active": {
    marginTop: 8,
    marginBottom: 8,
    height: "65px",
    transition: "transform 150ms linear",
    transform: "translateX(-800px)",
  },
  "@bp1": {
    right: "-400px",
    "&.active": {
      transition: "transform 150ms linear",
      transform: "translateX(-450px)",
    },
  },
  variants: {
    type: {
      success: {
        backgroundColor: "#E7FAF0",
        "& div:first-child": {
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#66CC99",
          width: "10px",
          height: "84px",
        },
        "& div:not(:first-child)": {
          marginLeft: "5vw",
          "@bp1": {
            marginLeft: "2vw",
          },
        },
      },
      error: {
        backgroundColor: "#FFe6ed",
        "& div:first-child": {
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#FC5E8B",
          width: "10px",
          height: "84px",
        },
        "& div:not(:first-child)": {
          marginLeft: "5vw",
          "@bp1": {
            marginLeft: "2vw",
          },
        },
      },
      warning: {
        backgroundColor: "#FFcc00",
      },
    },
  },
});

const ToastMessage = styled("span", {
  fontWeight: 400,
  lineHeight: "20px",
  marginLeft: "5vw",
  fontSize: "$toastSize",
  color: "#0D1F2D",
  "@bp1": {
    marginLeft: "1vw",
  },
});

export default ToastItem;
