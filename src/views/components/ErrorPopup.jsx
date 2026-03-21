import { useContext } from "react";
import { createPortal } from "react-dom";
import { ErrorContext } from "../context/ErrorContext";
import "../../assets/styles/ErrorPopup.css";

const ErrorPopup = () => {
    const { error, setError } = useContext(ErrorContext);

    if (!error) return null;

    return createPortal(
        <>
            <div className="error-overlay" onClick={() => setError("")}></div>
            <div className="error-popup">
                <p>{error}</p>
                <button onClick={() => setError("")}>Close</button>
            </div>
        </>,
        document.body
    );
};

export default ErrorPopup;