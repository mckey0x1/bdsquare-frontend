"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DialogTitle } from "@radix-ui/react-dialog";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { sendloginOTP, VerifyloginOTP } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("phone", `+91${phoneNumber}`);

      await sendloginOTP(formData); // Call the function to send OTP

      setStep("otp");
      setResendTimer(30); // Reset timer
      setCanResend(false); // Disable resend
    } catch (error: any) {
      setPhoneError(error.message || "Something went wrong while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canResend && step === "otp") {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend, step]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("phone", `+91${phoneNumber}`);
      formData.append("otp", otp);

      await VerifyloginOTP(formData);
      // success
      onClose();
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
    } catch (error: any) {
      setOtpError(error.message || "Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setPhoneError("");
    setOtpError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
        <DialogTitle className="sr-only">Login</DialogTitle>
        <DialogDescription className="sr-only hidden">
          Login or Signup with your mobile number and OTP.
        </DialogDescription>
        <div className="flex min-h-[400px] bg-white overflow-hidden">
          {/* Left Side - Brand Section */}
          <div className="flex-1 bg-black text-white p-6 hidden sm:flex flex-col justify-between relative">
            {/* Logo and Branding */}
            <div className="space-y-4 hidden items-center sm:flex flex-col">
              <div className="flex items-center space-x-3">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-lg font-bold">
                  <Image
                    priority
                    alt="logo"
                    src="/image/bdsquare-white.png"
                    height={60}
                    width={60}
                  />
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold mb-2 leading-tight">
                  Unlock the Spirit. Conquer the Style
                </h1>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm font-bold mb-1">1,00,000+</div>
                <div className="text-xs text-gray-300">Satisfied Customer</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm font-bold mb-1">We Ship your</div>
                <div className="text-xs text-gray-300">
                  orders within 24 Hours
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm font-bold mb-1">9,820+</div>
                <div className="text-xs text-gray-300">Pincodes Reached</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {step === "phone" ? (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      Your Style Journey Starts Now
                    </h2>
                  </div>

                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="flex flex-col">
                      <div className="flex border-2 border-gray-200 focus-within:border-red-600 transition-colors">
                        <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-200">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjYiIGZpbGw9IiNGRjk5MzMiLz4KPHJlY3QgeT0iNiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjYiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSI2IiBmaWxsPSIjMTM4ODA4Ii8+Cjwvc3ZnPgo="
                            alt="India Flag"
                            className="w-4 h-3 mr-2"
                          />
                          <span className="text-gray-700 font-medium text-sm">
                            +91
                          </span>
                        </div>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter Mobile Number"
                          className="flex-1 border-0 focus:ring-0 text-sm py-2 px-3"
                          maxLength={10}
                          required
                        />
                      </div>
                      {phoneError && (
                        <span className="text-xs text-red-600 mt-1">
                          {phoneError}
                        </span>
                      )}
                    </div>

                    {/* <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="notify"
                        checked={notifyOffers}
                        onChange={(e) => setNotifyOffers(e.target.checked)}
                        className="w-3 h-3 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <label htmlFor="notify" className="text-gray-600 text-xs">
                        Notify me with offers & updates
                      </label>
                    </div> */}

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-semibold"
                      disabled={loading}>
                      {loading ? "Sending OTP..." : "Continue"}
                    </Button>
                  </form>

                  <div className="text-center text-xs text-gray-500 mt-4">
                    I accept that I have read & understood your{" "}
                    <a href="/privacy" className="text-red-600 hover:underline">
                      Privacy Policy and T&Cs.
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setStep("phone")}
                      className="p-1 hover:bg-gray-100 transition-colors mr-2">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <h2 className="text-lg font-bold text-gray-900">
                      Verify OTP
                    </h2>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="flex flex-col">
                      <Input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter 6-digit OTP"
                        className="text-center text-lg tracking-widest py-2 border-2 focus:border-red-600"
                        maxLength={6}
                        required
                      />
                      {otpError && (
                        <span className="text-xs text-red-600 mt-1">
                          {otpError}
                        </span>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-semibold"
                      disabled={loading}>
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>

                    <div className="text-center text-xs">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="text-red-600 hover:underline font-medium">
                          Resend OTP
                        </button>
                      ) : (
                        <span className="text-gray-500">
                          Resend OTP in {resendTimer}s
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
