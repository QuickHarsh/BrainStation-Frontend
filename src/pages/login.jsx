import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "@/components/common/logo";
import { login } from "@/service/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirecting after successful login

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });
      if (response.success) {
        console.log("Login successful:", response.data);

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-cyan-500">
      <div className="bg-white rounded-lg shadow-lg w-8/12 max-w-lg p-8">
        <div className="mb-5">
          <Logo />
        </div>
        <h2 className="text-center text-xl font-inter font-semibold mb-2">Login</h2>
        <p className="text-center font-inter text-sm text-gray-500 mb-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <a href="/forgot-password" className="font-inter text-xs text-right block underline mb-4">
            Forgot your password
          </a>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-inter font-semibold text-white rounded-full shadow ${
              email && password && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!email || !password || loading}
          >
            {loading ? "Loading, please wait..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
