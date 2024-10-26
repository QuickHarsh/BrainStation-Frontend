import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/common/logo";
import { loginUser } from "@/store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      console.log("Login successful:", result.payload);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-cyan-500">
      <div className="bg-white rounded-lg shadow-lg w-[27rem] max-w-lg p-8">
        <div className="mb-5">
          <Logo />
        </div>
        <h2 className="text-center text-xl font-inter font-semibold mb-2">Login</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
