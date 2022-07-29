import type { NextPage } from "next";
import { ToastType, useToast } from "../contexts/toastContext";
const Home: NextPage = () => {
  const { addNewToast } = useToast();
  const handleAddToast = (type: ToastType) => {
    addNewToast({ message: "Teste", type, duration: 10000 });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        style={{
          width: "160px",
          height: "35px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
        onClick={() => handleAddToast("error")}
      >
        <span>Show Toast Error</span>
      </button>
      <button
        style={{
          width: "160px",
          height: "35px",
          marginTop: "15px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
        onClick={() => handleAddToast("success")}
      >
        <span>Show Toast Success</span>
      </button>
    </div>
  );
};

export default Home;
