"use client";
import React, { useState } from "react";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Define the component
const AuthBox: React.FC = () => {
  // State for determining if it's login or registration
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Toggle the login/register state
  const handleToggle = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  // Render the component
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f6f5f7]">
      <div className="flex w-[760px] min-h-[480px] bg-white shadow-lg relative overflow-hidden">
        {/* Login/Registration Forms */}
        <div
          className={`flex flex-col justify-center items-center w-[380px] absolute transition-transform duration-1000 ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Login */}
          <h2 className="text-2xl mb-5">{isLogin ? "Daxil ol" : "Qeydiyyat"}</h2>

          <div className="flex justify-center mb-5">
            <GoogleIcon className="text-3xl mx-3 cursor-pointer" />
            <GitHubIcon className="text-3xl mx-3 cursor-pointer" />
            <LinkedInIcon className="text-3xl mx-3 cursor-pointer" />
          </div>

          <form className="flex flex-col items-center w-full mt-5">
            {!isLogin && (
              <div className="relative w-full mb-4">
                <PersonIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#ff6b81]" />
                <input
                  type="text"
                  id="name"
                  placeholder="Tam adınızı daxil edin"
                  className="w-[290px] h-[40px] pl-10 border-none bg-[#ffe3e3] rounded-md"
                />
              </div>
            )}

            <div className="relative w-full mb-4">
              <EmailIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#ff6b81]" />
              <input
                type="email"
                id="email"
                placeholder="E-poçt adresinizi daxil edin"
                className="w-[290px] h-[40px] pl-10 border-none bg-[#ffe3e3] rounded-md"
              />
            </div>

            <div className="relative w-full mb-4">
              <LockIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#ff6b81]" />
              <input
                type="password"
                id="password"
                placeholder="Şifrənizi daxil edin"
                className="w-[290px] h-[40px] pl-10 border-none bg-[#ffe3e3] rounded-md"
              />
            </div>

            <button
              type="submit"
              className={`w-[290px] h-[40px] mt-5 text-white rounded-md ${
                isLogin
                  ? "bg-gradient-to-r from-[#ff084e] to-[#ff6b81]"
                  : "bg-gradient-to-r from-[#ff084e] to-[#ff6b81]"
              }`}
            >
              {isLogin ? "Daxil ol" : "Qeydiyyat"}
            </button>
          </form>

          {isLogin && (
            <a href="#" className="mt-3 text-xs text-gray-500">
              Şifrəni unutmusunuz?
            </a>
          )}
        </div>

        {/* Toggle Box */}
        <div
          className={`flex flex-col justify-center items-center w-[380px] h-full text-white absolute transition-transform duration-1000 ${
            isLogin
              ? "bg-gradient-to-br from-[#ff084e] to-[#ff6b81] translate-x-[100%]"
              : "bg-gradient-to-r from-[#ff084e] to-[#ff6b81] translate-x-0"
          }`}
        >
          <h3 className="text-lg mb-3">
            {isLogin ? "Hələ qeydiyyatdan keçməmisiniz?" : "Artıq qeydiyyatdan keçmisiniz?"}
          </h3>
          <button
            onClick={handleToggle}
            className="w-[290px] h-[40px] mt-2 text-white border border-white rounded-lg hover:bg-[#ff6b81] hover:text-gray-800"
          >
            {isLogin ? "Qeydiyyat" : "Daxil ol"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
