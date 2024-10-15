import { useState } from "react";
import Logo from "@/components/common/logo";
import GoogleIcon from "@/components/icons/google-icon";
import { register } from "../service/auth";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    organization: ""
  });

  const [loading, setLoading] = useState(false); // Handle loading state
  const [error, setError] = useState(null); // Handle error state
  const [success, setSuccess] = useState(false); // Handle success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoogleSignIn = () => {
    // Google sign-in functionality should be implemented here.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await register(formData); // Register the user using the form data
      setSuccess(true); // Set success to true when account creation is successful
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create an account"); // Handle error
    } finally {
      setLoading(false); // Stop loading spinner regardless of the result
    }
  };

  const { name, email, username, password, organization } = formData;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-cyan-500">
      <div className="bg-white rounded-lg shadow-lg w-8/12 max-w-lg p-8">
        {/* Logo */}
        <div className="mb-5">
          <Logo />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-inter font-semibold mb-2">Create an account</h2>
        <p className="text-center font-inter text-sm text-gray-500 mb-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
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

        {/* Account Creation Form */}
        <form onSubmit={handleSubmit}>
          <p className="block text-gray-500 text-center text-xs mb-2 font-inter">
            Enter your details to create an account.
          </p>

          {/* Name */}
          <label className="block text-gray-500 text-xs mb-2 font-inter">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Email */}
          <label className="block text-gray-500 text-xs mb-2 font-inter">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Username */}
          <label className="block text-gray-500 text-xs mb-2 font-inter">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Password */}
          <label className="block text-gray-500 text-xs mb-2 font-inter">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Organization */}
          <label className="block text-gray-500 text-xs mb-2 font-inter">Organization</label>
          <input
            type="text"
            name="organization"
            value={organization}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">Account created successfully!</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 font-inter font-semibold text-white rounded-full shadow ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : email && password && name && username
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={loading || !email || !password || !name || !username}
          >
            {loading ? "Creating Account..." : "Create an account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
