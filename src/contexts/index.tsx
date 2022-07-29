import { FC, ReactNode } from "react";
import { ToastProvider } from "./toastContext";

interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => (
  <ToastProvider>{children}</ToastProvider>
);

export default Providers;
