import { useState, useEffect } from "react";

const ToastMsg = ({message , type}) => {
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
    <span>{message}</span>
  </div>
</div>}</>
  );
};

export default ToastMsg