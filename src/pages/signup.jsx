import { useState } from "react";
import Logo from "@/components/common/logo";
import GoogleIcon from "@/components/icons/google-icon";

const CreateAccount = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create account with email:", email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-cyan-500">
      <div className="bg-white rounded-lg shadow-lg w-8/12 max-w-lg p-8">
        {/* BrainStation Logo */}
        <div className="mb-5">
          <Logo />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-inter font-semibold mb-2">Create an account</h2>
        <p className="text-center font-inter text-sm text-gray-500 mb-4">
          Already have an account?{" "}
          <a href="/admin-portal/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-inter py-0 px-4 rounded-full mb-4 border border-black"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-gray-400 font-inter ">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleSubmit}>
          <p className="block text-gray-500 text-center text-xs mb-2 font-inter">
            Enter your email address to create an account.
          </p>
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 font-inter font-semibold text-white rounded-full shadow ${
              email ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!email}
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
