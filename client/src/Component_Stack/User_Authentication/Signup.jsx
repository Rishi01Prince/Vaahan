import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, MapPinIcon } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "axios";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
  });

  
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('Google Login Successful:', code);
      const token = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/googleSignIn`, { 
        code: code,
      });

      localStorage.setItem("userEmail", token.data.data.email);
      localStorage.setItem("userName", token.data.data.name);
      localStorage.setItem("profilePic", token.data.data.picture);
      Cookies.set("authToken", token.data.authToken, { expires: 7 });
      console.log(Cookies.get("authToken"));
      navigate("/");
    },
    flow: 'auth-code',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !repeatPassword
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (credentials.password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please agree to the terms of service.");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/user/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.address,
          pincode: credentials.pincode,
        }),
      }
    );

    const json = await response.json();

    if (json.success) {
      console.log(json);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-n-8/90 to-gray-800 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Create your account
        </h2>
        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Section */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.name}
                onChange={onChange}
                name="name"
                placeholder="John Doe"
              />
            </div>

            {/* Email Section */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.email}
                onChange={onChange}
                name="email"
                placeholder="johndoe@example.com"
              />
            </div>

            {/* Password Section */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.password}
                onChange={onChange}
                name="password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Confirm Password Section */}
            <div className="relative">
              <label
                htmlFor="repeatPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Repeat your password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="repeatPassword"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                name="repeatPassword"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Address Section */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.address}
                onChange={onChange}
                name="address"
                placeholder="123 Main St"
              />
            </div>

            {/* Pincode Section with Fetch Location Button */}
            <div className="flex items-center gap-2">
              <div className="w-3/4">
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-300"
                >
                  Pincode:
                </label>
                <input
                  type="text"
                  id="pincode"
                  className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-transparent rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={credentials.pincode}
                  onChange={onChange}
                  name="pincode"
                  placeholder="123456"
                />
              </div>
              <div className="w-1/4 mt-6">
                <button
                  type="button"
                  onClick={() => alert("Fetching location...")}
                  className="w-full h-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
                >
                  <MapPinIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-gray-700"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-300"
              >
                I accept the{" "}
                <Link to="#" className="text-blue-500 hover:text-blue-400">
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          {/* Log in with Google Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={googleLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Log in with Google
            </button>
          </div>

          {/* Already Registered */}
          <div className="text-sm text-center text-gray-300 mt-3">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
