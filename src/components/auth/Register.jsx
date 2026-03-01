import { useState } from 'react';
import { registerUser } from '../../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const { token } = await registerUser(formData);
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                {error &&
                    <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                        {error}
                    </p>
                }

                <input type="text" name="name" placeholder="Name" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <input type="email" name="email" placeholder="Email" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <input type="password" name="password" placeholder="Password" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Register
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
};

export default Register;
