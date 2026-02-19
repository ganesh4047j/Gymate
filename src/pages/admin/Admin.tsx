import React, { useState } from "react";
import { PRODUCTS } from "../../data";
import { Product, User } from "../../types";

interface AdminProps {
  user: User;
  onLogout: () => void;
}

// Reusable Modal Component for Admin Actions
const AdminModal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm animate-fade-in">
    <div className="bg-[#0A0A0A] border border-[#FFD700]/30 w-full max-w-2xl rounded-sm shadow-[0_0_100px_rgba(255,215,0,0.1)] overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111111]">
        <h3 className="font-display font-black text-xl text-[#FFD700] uppercase italic tracking-widest">
          {title}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-3xl transition-colors"
        >
          &times;
        </button>
      </div>
      <div className="p-8 max-h-[70vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

export const Admin: React.FC<AdminProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<
    "inventory" | "orders" | "users" | "add_product"
  >("inventory");
  const [localProducts, setLocalProducts] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Modal States for Order/User monitoring
  const [viewingOrder, setViewingOrder] = useState<any>(null);
  const [viewingUser, setViewingUser] = useState<any>(null);

  const [usersList] = useState([
    {
      id: 1,
      name: "Mark S.",
      email: "mark@example.com",
      role: "user",
      mobile: "555-0123",
      joined: "2025-10-12",
      orders: 4,
    },
    {
      id: 2,
      name: "Sarah J.",
      email: "sarah@example.com",
      role: "user",
      mobile: "555-4567",
      joined: "2026-01-05",
      orders: 2,
    },
    {
      id: 3,
      name: "David R.",
      email: "david@gym.com",
      role: "user",
      mobile: "555-8888",
      joined: "2026-02-18",
      orders: 1,
    },
  ]);

  const orders = [
    {
      id: "#ORD-1024",
      user: "Mark S.",
      total: 245.0,
      status: "Shipped",
      date: "2026-02-10",
      items: ["Titan Lever Belt", "Wrist Wraps"],
    },
    {
      id: "#ORD-1025",
      user: "Sarah J.",
      total: 89.0,
      status: "Processing",
      date: "2026-02-15",
      items: ["Massage Gun V2"],
    },
    {
      id: "#ORD-1026",
      user: "David R.",
      total: 199.0,
      status: "Delivered",
      date: "2026-02-12",
      items: ["Pull-Up Station"],
    },
  ];

  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    price: 0,
    originalPrice: 0,
    offerPercentage: 0,
    description: "",
    category: "gear",
    stock: 0,
    image: "",
  });

  // Calculate price based on offer or vice versa
  const updateOfferLogic = (
    type: "price" | "offer",
    value: number,
    target: any,
    setter: any,
  ) => {
    if (type === "price") {
      const discount =
        target.originalPrice > 0
          ? Math.round(
              ((target.originalPrice - value) / target.originalPrice) * 100,
            )
          : 0;
      setter({ ...target, price: value, offerPercentage: discount });
    } else {
      const newPrice =
        target.originalPrice - target.originalPrice * (value / 100);
      setter({ ...target, offerPercentage: value, price: newPrice });
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setLocalProducts(
        localProducts.map((p) =>
          p.id === editingProduct.id ? editingProduct : p,
        ),
      );
      setEditingProduct(null);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...newProduct,
      id: localProducts.length + 1,
      rating: 5.0,
    };
    setLocalProducts([...localProducts, product]);
    alert("GYMATE INVENTORY UPDATED");
    setActiveTab("inventory");
  };

  const inputStyle =
    "w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:border-[#FFD700] outline-none transition-all placeholder-gray-700 text-sm";
  const labelStyle =
    "block text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* ELITE ADMIN HEADER */}
      <header className="bg-[#0A0A0A] border-b border-[#FFD700]/20 px-8 h-24 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFD700] p-2 rounded-sm shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            <span className="material-symbols-outlined text-black text-2xl font-bold">
              dashboard_customize
            </span>
          </div>
          <div>
            <h1 className="font-display font-black text-2xl tracking-tighter uppercase italic text-white leading-none">
              GYMATE <span className="text-[#FFD700]">CMD</span>
            </h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mt-1">
              Authorized Access: {user.username}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="group flex items-center gap-3 text-gray-500 hover:text-[#FFD700] font-black uppercase text-[10px] tracking-widest transition-all"
        >
          TERMINATE SESSION
          <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
            logout
          </span>
        </button>
      </header>

      <div className="flex-1 p-10 max-w-[1600px] mx-auto w-full">
        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-10 bg-[#0A0A0A] p-1 border border-white/5 rounded-sm w-fit">
          {[
            { id: "inventory", label: "Inventory", icon: "inventory_2" },
            { id: "add_product", label: "Add Item", icon: "add_box" },
            { id: "orders", label: "Orders", icon: "package_2" },
            { id: "users", label: "Users", icon: "person_search" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-3 rounded-sm font-black uppercase text-[10px] tracking-widest transition-all ${
                activeTab === tab.id
                  ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/10"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-[#0A0A0A] rounded-sm border border-white/5 p-8 shadow-2xl min-h-[60vh] animate-fade-in">
          {/* INVENTORY MANAGEMENT */}
          {activeTab === "inventory" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="p-4 font-black">Designation</th>
                    <th className="p-4 font-black text-center">Status</th>
                    <th className="p-4 font-black text-center">Units</th>
                    <th className="p-4 font-black text-center">Base Cost</th>
                    <th className="p-4 font-black text-center">Market Price</th>
                    <th className="p-4 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {localProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4 font-black text-white text-xs uppercase tracking-wider">
                        {p.name}
                      </td>
                      <td className="p-4 text-center">
                        {(p.stock || 0) > 10 ? (
                          <span className="text-green-500 text-[9px] font-black bg-green-500/10 px-3 py-1 border border-green-500/20 uppercase">
                            Operational
                          </span>
                        ) : (
                          <span className="text-red-500 text-[9px] font-black bg-red-500/10 px-3 py-1 border border-red-500/20 uppercase">
                            Critical
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center font-mono text-white text-xs">
                        {p.stock || 0}
                      </td>
                      <td className="p-4 text-center text-gray-600 text-xs line-through">
                        ${p.originalPrice?.toFixed(2)}
                      </td>
                      <td className="p-4 text-center text-[#FFD700] font-black text-sm">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FFD700] transition-colors"
                        >
                          Manage Unit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ADD PRODUCT */}
          {activeTab === "add_product" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-10">
                <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">
                  Deploy New Gear
                </h2>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">
                  Enter technical specifications for inventory addition
                </p>
              </div>
              <form
                onSubmit={handleAddProduct}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <div className="space-y-6">
                  <div>
                    <label className={labelStyle}>Product Name</label>
                    <input
                      required
                      type="text"
                      className={inputStyle}
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>
                      Performance Specs (Description)
                    </label>
                    <textarea
                      required
                      className={`${inputStyle} h-32 resize-none`}
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle}>Category</label>
                      <select
                        className={inputStyle}
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="gear">Gear</option>
                        <option value="accessories">Accessories</option>
                        <option value="equipment">Equipment</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelStyle}>Stock Allocation</label>
                      <input
                        required
                        type="number"
                        className={inputStyle}
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle}>Actual Price ($)</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        className={inputStyle}
                        value={newProduct.originalPrice}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            originalPrice: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>
                        Offer Price / Selling Price ($)
                      </label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        className={inputStyle}
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyle}>Image Asset URL</label>
                    <input
                      required
                      type="text"
                      className={inputStyle}
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                    />
                  </div>
                  <div className="p-6 bg-[#111111] border border-[#FFD700]/10 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-gray-600 uppercase font-black mb-4">
                      Live Preview
                    </span>
                    <img
                      src={
                        newProduct.image ||
                        "https://via.placeholder.com/300x200?text=NO+IMAGE"
                      }
                      className="w-full h-32 object-contain opacity-50"
                      alt="Preview"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FFD700] text-black font-black uppercase py-5 text-xs tracking-widest hover:bg-white transition-all shadow-xl shadow-[#FFD700]/10"
                  >
                    Initialize Deployment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ORDER MONITORING */}
          {activeTab === "orders" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="p-4 font-black">Order Hash</th>
                    <th className="p-4 font-black">Customer</th>
                    <th className="p-4 font-black text-center">Status</th>
                    <th className="p-4 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-mono text-white text-xs">
                        {o.id}
                      </td>
                      <td className="p-4 text-white text-xs font-bold uppercase">
                        {o.user}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 text-[9px] font-black uppercase border ${
                            o.status === "Delivered"
                              ? "border-green-500/30 text-green-500"
                              : "border-yellow-500/30 text-yellow-500"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setViewingOrder(o)}
                          className="text-[10px] font-black uppercase text-[#FFD700] hover:text-white"
                        >
                          View Manifest
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* USER MANAGEMENT */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="p-4 font-black">Subject ID</th>
                    <th className="p-4 font-black">Full Name</th>
                    <th className="p-4 font-black text-center">Clearance</th>
                    <th className="p-4 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-mono text-xs text-gray-500">
                        #00{u.id}
                      </td>
                      <td className="p-4 text-white text-xs font-black uppercase">
                        {u.name}
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-green-500 text-[9px] font-black border border-green-500/20 px-3 py-1 uppercase">
                          Active
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setViewingUser(u)}
                          className="text-[10px] font-black uppercase text-gray-400 hover:text-white"
                        >
                          Profile CMD
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* INVENTORY EDIT MODAL */}
      {editingProduct && (
        <AdminModal
          title={`Configure Unit: ${editingProduct.name}`}
          onClose={() => setEditingProduct(null)}
        >
          <form onSubmit={handleSaveProduct} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Designation Name</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className={labelStyle}>Allocation (Stock)</label>
                <input
                  type="number"
                  className={inputStyle}
                  value={editingProduct.stock || 0}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}>Base Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className={inputStyle}
                  value={editingProduct.originalPrice || 0}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      originalPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className={labelStyle}>Offer / Discount (%)</label>
                <input
                  type="number"
                  className={inputStyle}
                  value={editingProduct.offerPercentage || 0}
                  onChange={(e) =>
                    updateOfferLogic(
                      "offer",
                      Number(e.target.value),
                      editingProduct,
                      setEditingProduct,
                    )
                  }
                />
              </div>
              <div>
                <label className={labelStyle}>Market Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className={inputStyle}
                  value={editingProduct.price}
                  onChange={(e) =>
                    updateOfferLogic(
                      "price",
                      Number(e.target.value),
                      editingProduct,
                      setEditingProduct,
                    )
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-8 border-t border-white/5">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-8 py-3 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all"
              >
                Abort
              </button>
              <button
                type="submit"
                className="px-12 py-3 bg-[#FFD700] text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg shadow-[#FFD700]/10"
              >
                Commit Changes
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* ORDER DETAILS MODAL */}
      {viewingOrder && (
        <AdminModal
          title={`Order Manifest: ${viewingOrder.id}`}
          onClose={() => setViewingOrder(null)}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8 border-b border-white/5 pb-6">
              <div>
                <p className={labelStyle}>Customer Designation</p>
                <p className="text-white font-black uppercase text-sm">
                  {viewingOrder.user}
                </p>
              </div>
              <div>
                <p className={labelStyle}>Status Sequence</p>
                <p className="text-[#FFD700] font-black uppercase text-sm">
                  {viewingOrder.status}
                </p>
              </div>
            </div>
            <div>
              <p className={labelStyle}>Deployment Items</p>
              <ul className="space-y-2">
                {viewingOrder.items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-xs text-gray-400 font-bold uppercase flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full"></span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <p className="text-gray-500 text-[10px] font-black uppercase">
                Grand Total
              </p>
              <p className="text-white font-black text-2xl tracking-tighter">
                ${viewingOrder.total.toFixed(2)}
              </p>
            </div>
          </div>
        </AdminModal>
      )}

      {/* USER PROFILE MODAL */}
      {viewingUser && (
        <AdminModal
          title={`Subject Profile: #00${viewingUser.id}`}
          onClose={() => setViewingUser(null)}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-6 pb-6 border-b border-white/5">
              <div className="w-20 h-20 bg-[#111111] border border-[#FFD700]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 text-4xl">
                  person
                </span>
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-xl italic">
                  {viewingUser.name}
                </h4>
                <p className="text-gray-500 text-[10px] font-bold uppercase">
                  {viewingUser.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className={labelStyle}>Mobile Link</p>
                <p className="text-white font-mono text-sm">
                  {viewingUser.mobile}
                </p>
              </div>
              <div>
                <p className={labelStyle}>Total Deployments</p>
                <p className="text-white font-mono text-sm">
                  {viewingUser.orders} Orders
                </p>
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-white/5 border border-white/10 text-white font-black uppercase py-3 text-[9px] hover:bg-white/10 transition-all">
                Communication Log
              </button>
              <button className="flex-1 bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase py-3 text-[9px] hover:bg-red-500 hover:text-white transition-all">
                Revoke Access (Ban)
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};