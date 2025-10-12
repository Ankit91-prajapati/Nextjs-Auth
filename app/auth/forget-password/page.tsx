'use client'
import { authClient } from "@/actions/auth-client";
import { useState } from "react";

function ForgetPasswordFlow() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const sendOtp = async () => {
    try {
      const { data, error } = await authClient.forgetPassword.emailOtp({ email });
      if (error) {
        setStatus(`❌ Failed to send OTP: ${error.message}`);
      } else {
        setStatus("📩 OTP sent to your email.");
      }
    } catch (err) {
      setStatus(`⚠️ Error sending OTP: ${err}`);
    }
  };

  const verifyOtp = async () => {
    try {
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        email,
        type: "forget-password",
        otp,
      });
      if (error) {
        setStatus(`❌ OTP verification failed: ${error.message}`);
      } else {
        setStatus("✅ OTP verified. You can now reset your password.");
      }
    } catch (err) {
      setStatus(`⚠️ Error verifying OTP: ${err}`);
    }
  };

  const resetPassword = async () => {
    try {
      const { data, error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: newPassword,
      });
      if (error) {
        setStatus(`❌ Password reset failed: ${error.message}`);
      } else {
        setStatus("🔒 Password reset successful!");
      }
    } catch (err) {
      setStatus(`⚠️ Error resetting password: ${err}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white gap-5">
      <h2>🔐 Forgot Password</h2>
      <div className="flex flex-row items-center justify-center">
  <div className="flex flex-col gap-5 w-[300px] h-[300px] bg-gradient-to-t from-slate-100 via-sky-500 to-indigo-100  items-center justify-center">
        <div  className="flex flex-col">
          <input
            className="bg-zinc-100"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="hover:text-blue-700" >Send OTP</button>
        </div>

        <div  className="flex flex-col">
          <input
            className="bg-zinc-400"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="hover:text-blue-700">Verify OTP</button>
        </div>

        <div  className="flex flex-col">
          <input
           className="bg-zinc-100"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}className="hover:text-blue-700" >Reset Password</button>
        </div>


        <p>{status}</p>
      </div>
      </div>
     

    </div>
  );
}

export default ForgetPasswordFlow;