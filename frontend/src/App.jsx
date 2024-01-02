import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { async } from "@firebase/util";
function App() {
  const [count, setCount] = useState(7307320365);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState(null);
  async function onSignup() {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${count}`,
        recaptcha
      );
      setUser(confirmation);
    } catch (err) {
      console.log(err.message);
    }
  }

  const verifyOtp = async () => {
    try {
      if (user) {
        const data = await user.confirm(otp);
        if (data && data.user) {
          alert("Otp Verified");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div id="recaptcha"></div>
      <input
        value={count}
        onChange={(e) => setCount(e.currentTarget.value)}
        type="number"
      />
      <button onClick={onSignup}>Send Otp</button>

      <input
        value={otp}
        onChange={(e) => setOtp(e.currentTarget.value)}
        type="number"
      />
      <button onClick={verifyOtp}>Verify Otp</button>
    </div>
  );
}

export default App;
