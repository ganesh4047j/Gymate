import React, { useState } from 'react';
import { User } from '../../types';

interface RegisterProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ 
        name: formData.username, 
        username: formData.username, 
        email: formData.email, 
        role: 'user' 
    });
  };

  return (
    <div className="pt-32 pb-12 px-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-surface-dark p-8 rounded-lg border border-white/10">
        <h2 className="font-display font-bold text-3xl text-white uppercase italic mb-6 text-center">Join The Elite</h2>
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
              type="email" 
              placeholder="Email ID"
              required
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
            />
          </div>
          <div>
            <input 
              type="tel" 
              placeholder="Mobile Number"
              required
              value={formData.mobile} 
              onChange={e => setFormData({...formData, mobile: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
            />
          </div>
          <div>
             <input 
               type="password" 
               placeholder="Create Password"
               required
               value={formData.password} 
               onChange={e => setFormData({...formData, password: e.target.value})}
               className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
             />
          </div>
          <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-white transition-colors">
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? 
          <span onClick={() => onNavigate('login')} className="text-white underline cursor-pointer hover:text-primary ml-1">
              Login
          </span>
        </p>
      </div>
    </div>
  );
};
