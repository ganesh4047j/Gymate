import React, { useState } from 'react';
import { User } from '../../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin123') {
      onLogin({ name: 'Administrator', username: 'admin', role: 'admin' });
    } else {
      onLogin({ name: formData.username, username: formData.username, role: 'user' });
    }
  };

  return (
    <div className="pt-32 pb-12 px-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-surface-dark p-8 rounded-lg border border-white/10">
        <h2 className="font-display font-bold text-3xl text-white uppercase italic mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <input 
               type="text" 
               placeholder="Username"
               required
               value={formData.username} 
               onChange={e => setFormData({...formData, username: e.target.value})}
               className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
             />
          </div>
          <div>
             <input 
               type="password" 
               placeholder="Password"
               required
               value={formData.password} 
               onChange={e => setFormData({...formData, password: e.target.value})}
               className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
             />
          </div>
          <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-white transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? 
          <span onClick={() => onNavigate('register')} className="text-white underline cursor-pointer hover:text-primary ml-1">
              Join the Elite
          </span>
        </p>
      </div>
    </div>
  );
};
