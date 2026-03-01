import { useState } from 'react';
import { loginUser } from '../../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { token } = await loginUser(formData);
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                {error &&
                    <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                        {error}
                    </p>
                }

                <input type="email" name="email" placeholder="Email" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <input type="password" name="password" placeholder="Password" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Login
                </button>

                <p className="mt-4 text-center text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
};

export default Login;
