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
    <div>
      <h2>🔐 Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={resetPassword}>Reset Password</button>

      <p>{status}</p>
    </div>
  );
}

export default ForgetPasswordFlow;