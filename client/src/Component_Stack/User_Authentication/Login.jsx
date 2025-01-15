import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });


  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('Google Login Successful:', code);
      const token = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/googleSignIn`, { 
        code: code,
      });
    

      localStorage.setItem("userName", token.data.data.name);
      localStorage.setItem("profilePic", token.data.data.picture);
      localStorage.setItem("userEmail", token.data.data.email);
      Cookies.set("authToken", token.data.authToken, { expires: 7 });
      console.log(Cookies.get("authToken"));
      console.log(localStorage.getItem("profilePic"));
      navigate("/");
    },
    flow: 'auth-code',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setErrorMessage("Please enter a valid email and password.");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);

      navigate("/");
    } else {
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-n-8/90  to-gray-800 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Login to your account
        </h2>
        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.password}
                onChange={handleChange}
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-gray-700"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="#"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-500 hover:text-blue-400">
              I am a new User
            </Link>
          </div>
          <div className="divider flex items-center justify-center my-4">
            <span className="text-center text-gray-300 text-sm">OR</span>
          </div>
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#20B2AA] hover:bg-[#452c63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            type="button"
            onClick={() => googleLogin()} 
          >
            Sign in with Google 🚀
          </button>
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google Credential Response:", credentialResponse);
              const idToken = credentialResponse.credential; 
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
        </form>
      </div>
    </div>
  );
}