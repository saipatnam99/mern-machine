import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(username);
    console.log(password);

    if (response.status === 200) {
      alert('Registration successful');
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="register bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={register}>
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Register
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
