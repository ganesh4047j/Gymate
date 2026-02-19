import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        mobile: user.mobile || '',
        password: ''
      });
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-lg max-w-md w-full shadow-glow">
        
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a1a1a] rounded-t-lg">
          <h3 className="font-display font-bold text-xl text-white uppercase italic">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black font-bold text-2xl uppercase">
              {user.name?.charAt(0) || user.username?.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{user.name || user.username}</p>
              <p className="text-text-muted text-sm">@{user.username}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Username</label>
               <input 
                 type="text" 
                 value={formData.username} 
                 onChange={e => setFormData({...formData, username: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
               />
            </div>
            <div>
               <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Full Name</label>
               <input 
                 type="text" 
                 value={formData.name} 
                 onChange={e => setFormData({...formData, name: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
               />
            </div>
            <div>
               <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Email ID</label>
               <input 
                 type="email" 
                 value={formData.email} 
                 onChange={e => setFormData({...formData, email: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
               />
            </div>
            <div>
               <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Mobile Number</label>
               <input 
                 type="tel" 
                 value={formData.mobile} 
                 onChange={e => setFormData({...formData, mobile: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
               />
            </div>
            <div>
               <label className="block text-gray-400 text-xs uppercase font-bold mb-1">New Password (Optional)</label>
               <input 
                 type="password" 
                 placeholder="Leave blank to keep current"
                 value={formData.password} 
                 onChange={e => setFormData({...formData, password: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none"
               />
            </div>
            
            <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-white transition-colors mt-4">
               Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
