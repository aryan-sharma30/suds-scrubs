import React, { useState, useEffect, useRef  } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./OTPInput.css"; 

const OTPInput = ({ otp, onOTPVerified }) => {
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [timerCount, setTimer] = useState(30);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  //const inputRefs = useRef([]);

//   const resendOTP = () => {
//     if (disable) return;
//     axios
//       .post("http://localhost:5000/send_recovery_email", {
//         OTP: otp,
//         recipient_email: email,
//       })
//       .then(() => {
//         setDisable(true);
//         alert("A new OTP has been sent to your email.");
//         setTimer(60);
//       })
//       .catch(console.log);
//   };

const verifyOTP = () => {
    // if (parseInt(OTPinput.join("")) === otp) {
    //   onOTPVerified();
    // } else {
    //   alert("Incorrect OTP. Try again or resend the OTP.");
    // }

    navigate('/change-password', { state: { email } });
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
        const newOTP = [...OTPinput];
        newOTP[index] = value;
        setOTPinput(newOTP);
  
        // Move focus to the next input if the digit is entered
        if (value && index < OTPinput.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
  };

//   const handleBackspace = (e, index) => {
//     if (e.key === 'Backspace' && otp[index] === '') {
//       if (index > 0) {
//         inputRefs.current[index - 1].focus();
//       }
//     }
//   };

const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && OTPinput[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "Backspace" && OTPinput[index] !== "") {
        // If the user presses backspace and there is a value in the current field
        const newOTP = [...OTPinput];
        newOTP[index] = ""; // Clear the current digit
        setOTPinput(newOTP);
        // Move focus to the previous input
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2>Email Verification</h2>
        <p>We've sent a code to your email: {email}</p>
        <div className="otp-inputs">
          {OTPinput.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
            />
          ))}
        </div>
        <button className="verify-button" 
         onClick={verifyOTP}
         >
          Verify Account
        </button>
        <div className="resend-section">
          <span>Didn't receive the code? </span>
          <button
            //onClick={resendOTP}
            disabled={disable}
            style={{
              color: disable ? "#F98B85" : "white",
              textDecoration: disable ? "none" : "underline",
              backgroundColor: disable? "none" : "rgba(0, 0, 0, 0.6)",
              cursor: disable? "not-allowed" : "pointer",
              border:"none"
            }}
          >
            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
