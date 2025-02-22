import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignup) {
      // Signup logic
      if (users.find((user) => user.email === email)) {
        alert('User already exists');
        return;
      }
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful');
      setIsSignup(false);
    } else {
      // Login logic
      const user = users.find((user) => user.email === email && user.password === password);
      if (!user) {
        alert('Invalid email or password');
        return;
      }
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{isSignup ? 'Signup' : 'Login'}</h1>
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full mt-4 text-indigo-600 hover:underline text-center"
        >
          {isSignup ? 'Already have an account? Login' : 'New user? Signup'}
        </button>
      </div>
    </div>
  );
}