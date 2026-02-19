import React, { useState } from 'react';
import { PRODUCTS } from '../../data';
import { Product, User } from '../../types';

interface AdminProps {
  user: User;
  onLogout: () => void;
}

export const Admin: React.FC<AdminProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'users' | 'add_product'>('inventory');
  const [localProducts, setLocalProducts] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [usersList] = useState([
    { id: 1, name: 'Mark S.', email: 'mark@example.com', role: 'user', mobile: '555-0123' },
    { id: 2, name: 'Admin User', email: 'admin@gymate.com', role: 'admin', mobile: '555-9999' },
    { id: 3, name: 'Sarah J.', email: 'sarah@example.com', role: 'user', mobile: '555-4567' },
  ]);

  const orders = [
    { id: '#ORD-1024', user: 'Mark S.', total: 245.00, status: 'Shipped', date: '2023-10-24' },
    { id: '#ORD-1025', user: 'Sarah J.', total: 89.00, status: 'Processing', date: '2023-10-25' },
    { id: '#ORD-1026', user: 'David R.', total: 199.00, status: 'Delivered', date: '2023-10-22' },
  ];

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, description: '', category: 'gear', stock: 0, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600'
  });

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setLocalProducts(localProducts.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: localProducts.length + 1,
      name: newProduct.name || 'New Product',
      description: newProduct.description || '',
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || undefined,
      rating: 0,
      image: newProduct.image || '',
      category: newProduct.category as any,
      stock: Number(newProduct.stock) || 0
    };
    setLocalProducts([...localProducts, product]);
    alert('Product Added Successfully!');
    setNewProduct({ name: '', price: 0, description: '', category: 'gear', stock: 0, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600' });
    setActiveTab('inventory');
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col">
      <header className="bg-black border-b border-white/10 px-6 h-20 flex items-center justify-between sticky top-0 z-50">
         <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
             <div>
                <h1 className="font-display font-black text-xl tracking-tighter uppercase italic text-white">Gymate Admin</h1>
                <p className="text-xs text-text-muted">Welcome, {user.username}</p>
             </div>
         </div>
         <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold uppercase text-sm">
            <span className="material-symbols-outlined">logout</span>
            Logout
         </button>
      </header>

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full">
         <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6 mb-8">
            {[
              { id: 'inventory', label: 'Inventory Management', icon: 'inventory_2' },
              { id: 'add_product', label: 'Add Product', icon: 'add_circle' },
              { id: 'orders', label: 'Order Monitoring', icon: 'shopping_cart_checkout' },
              { id: 'users', label: 'User Management', icon: 'group' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-all ${
                   activeTab === tab.id 
                   ? 'bg-primary text-black shadow-glow' 
                   : 'bg-surface-dark text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
         </div>

         <div className="bg-surface-dark rounded-xl border border-white/10 p-6 shadow-xl min-h-[60vh]">
            {activeTab === 'inventory' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-black/50 text-white uppercase font-bold border-b border-white/10">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4">Qty</th>
                      <th className="p-4">Actual Price</th>
                      <th className="p-4">Selling Price</th>
                      <th className="p-4">Offer</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {localProducts.map(p => {
                      const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
                      return (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-white">{p.name}</td>
                          <td className="p-4">
                             {(p.stock || 0) > 0 
                               ? <span className="text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded">In Stock</span> 
                               : <span className="text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">Out of Stock</span>
                             }
                          </td>
                          <td className="p-4 font-mono text-white">{p.stock || 0}</td>
                          <td className="p-4 text-gray-400 line-through">${p.originalPrice?.toFixed(2) || '-'}</td>
                          <td className="p-4 text-primary font-bold text-lg">${p.price.toFixed(2)}</td>
                          <td className="p-4 text-green-400">{discount > 0 ? `${discount}% OFF` : '-'}</td>
                          <td className="p-4">
                            <button onClick={() => setEditingProduct(p)} className="flex items-center gap-1 text-primary hover:text-white transition-colors uppercase font-bold text-xs bg-white/5 px-3 py-1.5 rounded border border-white/10 hover:bg-primary hover:border-primary hover:text-black">
                              <span className="material-symbols-outlined text-sm">edit</span> Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'add_product' && (
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-display font-black text-white uppercase italic mb-8 border-b border-white/10 pb-4">Add New Item to Inventory</h2>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div>
                           <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Product Name</label>
                           <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary" 
                              value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Description</label>
                           <textarea required className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary h-32" 
                              value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Category</label>
                              <select className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary"
                                 value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                                 <option value="gear">Gear</option>
                                 <option value="footwear">Footwear</option>
                                 <option value="accessories">Accessories</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Initial Stock</label>
                              <input required type="number" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary" 
                                 value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                           </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Selling Price ($)</label>
                              <input required type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary" 
                                 value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                           </div>
                           <div>
                              <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Actual Price ($)</label>
                              <input type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary" 
                                 placeholder="Optional"
                                 value={newProduct.originalPrice || ''} onChange={e => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})} />
                           </div>
                        </div>
                        <div>
                           <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Image URL</label>
                           <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary" 
                              value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                           {newProduct.image && (
                              <img src={newProduct.image} alt="Preview" className="mt-4 w-full h-48 object-cover rounded border border-white/10" />
                           )}
                        </div>
                        <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-white transition-colors mt-auto shadow-glow">
                           Add Product to Inventory
                        </button>
                     </div>
                  </form>
               </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-black/50 text-white uppercase font-bold border-b border-white/10">
                    <tr>
                      <th className="p-4">User ID</th>
                      <th className="p-4">Full Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Mobile</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usersList.filter(u => u.role === 'user').map(u => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-white">#{u.id}</td>
                        <td className="p-4 font-bold">{u.name}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4 font-mono">{u.mobile}</td>
                        <td className="p-4"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs font-bold uppercase">Active</span></td>
                        <td className="p-4">
                          <button className="text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1 rounded transition-colors uppercase font-bold text-xs">Ban User</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-black/50 text-white uppercase font-bold border-b border-white/10">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-white font-bold">{o.id}</td>
                        <td className="p-4">{o.user}</td>
                        <td className="p-4">{o.date}</td>
                        <td className="p-4 text-primary font-bold">${o.total.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                            o.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 
                            o.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4">
                           <button className="text-gray-400 hover:text-white">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
         </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setEditingProduct(null)}></div>
           <div className="relative bg-[#1a1a1a] border border-white/10 rounded-lg max-w-2xl w-full p-8 shadow-2xl">
              <h3 className="font-display font-black text-2xl text-white uppercase italic mb-6">Edit Product: {editingProduct.name}</h3>
              <form onSubmit={handleSaveProduct} className="space-y-6">
                 <div>
                    <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Product Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary"
                       value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-gray-400 text-xs uppercase font-bold mb-2">In Stock? / Stock Qty</label>
                       <div className="flex gap-4 items-center">
                          <input type="number" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary"
                             value={editingProduct.stock || 0} onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})} />
                          <div className={`text-xs font-bold px-2 py-1 rounded uppercase whitespace-nowrap ${(editingProduct.stock || 0) > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                             {(editingProduct.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-6">
                    <div>
                       <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Actual Price ($)</label>
                       <input type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary"
                          value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})} />
                    </div>
                    <div>
                       <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Selling Price ($)</label>
                       <input type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary"
                          value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Calculated Offer</label>
                        <div className="p-3 bg-white/5 rounded text-green-400 font-bold border border-white/5">
                           {editingProduct.originalPrice && editingProduct.originalPrice > editingProduct.price 
                              ? `${Math.round(((editingProduct.originalPrice - editingProduct.price) / editingProduct.originalPrice) * 100)}% OFF` 
                              : 'No Offer'}
                        </div>
                    </div>
                 </div>

                 <div className="flex gap-4 justify-end pt-4 border-t border-white/10">
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-3 rounded text-gray-400 font-bold uppercase hover:bg-white/5 transition-colors">Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-primary text-black rounded font-bold uppercase hover:bg-white transition-colors shadow-glow">Save Changes</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};
