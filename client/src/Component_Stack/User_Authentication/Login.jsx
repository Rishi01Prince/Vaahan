import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


<GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log("Google Credential Response:", credentialResponse);
    const idToken = credentialResponse.credential; // ID Token
    // saveGoogleToken({ access_token: idToken });
  }}
  onError={() => {
    console.log("Login Failed");
  }}
/>


export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Save Google token and send it to the backend
  // Save Google token and validate it before sending to the backend
// const saveGoogleToken = async (token) => {
//   console.log("Received Google Token:", token);

//   try {
//     // Step 1: Validate the token using Google's endpoint
//     const validationResponse = await fetch(
//       `https://oauth2.googleapis.com/tokeninfo?id_token=${token.access_token}`
//     );

//     const validationData = await validationResponse.json();

//     if (!validationResponse.ok) {
//       console.error("Google Token validation failed:", validationData);
//       setErrorMessage("Google Sign-In validation failed. Please try again.");
//       return;
//     }

//     console.log("Validated Token Data:", validationData);

//     // Optional: You can use this data to pre-fill user info or additional logic

//     // Step 2: Send the validated token to the backend
//     const response = await fetch("http://localhost:6000/user/googleSignIn", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         token: token.access_token, // Send the token to the backend
//       }),
//     });

//     const json = await response.json();

//     if (json.success) {
//       localStorage.setItem("authToken", json.authToken);
//       navigate("/"); // Redirect to home page on successful login
//     } else {
//       setErrorMessage("Google Sign-In failed on the backend. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error during Google Sign-In:", error);
//     setErrorMessage("An unexpected error occurred during Google Sign-In.");
//   }
// };


  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('Google Login Successful:', code);
      const tokens = await axios.post('http://localhost:7000/user/googleSignIn', {  // http://localhost:3001/auth/google backend that will exchange the code
        code,
      });
      console.log("Rishi") ;
      console.log(tokens);
    },
    flow: 'auth-code',
  });

  // Handle regular form submission
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
                placeholder="rishi.raj@gmail.com"
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
            onClick={() => googleLogin()} // Trigger Google Login
          >
            Sign in with Google 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
