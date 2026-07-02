import { useState, useEffect } from "react";
interface ToastMsgProps {
    message : String;
    type ?: "Error" | "Success"
}
const ToastMsg = ({message , type}: ToastMsgProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
 
  <> {isVisible && <div className="toast toast-start">
 
  <div className="alert alert-success">
    <span className={type== "Error" ? "bg-amber-700" : ""}>{message}</span>
  </div>
</div>}</>
  );
};

export default ToastMsg