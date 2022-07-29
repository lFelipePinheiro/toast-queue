import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import ToastItem from "../../components/toast-item";

interface ToastProps {
  addNewToast(Toast: Toast): void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export interface Toast {
  message: string;
  duration?: number;
  type: ToastType;
}

export interface ToastWithProps extends Toast {
  id: number;
  duration: number;
  ref?: MutableRefObject<HTMLDivElement | null>;
}

export type ToastType = "warning" | "success" | "error";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastProps>({} as ToastProps);
const DEFAULT_DURATION = 30000;
const MAX_TOASTS = 5;

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const toasts: ToastWithProps[] = [];
  const [queue, setQueue] = useState<Array<ToastWithProps>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNewToast = (toastData: Toast) => {
    const { type, message, duration = DEFAULT_DURATION } = toastData;
    if (queue.length >= MAX_TOASTS) {
      return;
    }

    const toast: ToastWithProps = {
      id: Date.now(),
      type,
      message,
      duration,
    };

    toasts.push(toast);
    process();
  };

  const process = () => {
    const firstToast = toasts.shift();
    if (firstToast) setQueue((toast) => [...toast, firstToast]);
  };

  const handleRemove = (id: number) => {
    setQueue((queue) => [...queue.filter((toast) => toast && toast.id !== id)]);
  };

  return (
    <ToastContext.Provider
      value={{
        addNewToast,
        containerRef,
      }}
    >
      {children}
      {containerRef.current &&
        createPortal(
          queue.map((toast) => {
            return (
              <ToastItem
                key={toast.id}
                {...toast}
                onRemove={() => handleRemove(toast.id)}
              />
            );
          }),
          containerRef.current
        )}
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }

  return context;
}

export { ToastContext, ToastProvider, useToast };
