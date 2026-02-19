import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Modal } from "./components/shared/Modal";
import { SearchModal } from "./components/shared/SearchModal";
import { ScienceModal } from "./components/shared/ScienceModal";
import { Profile } from "./components/shared/Profile";
import { Home } from "./pages/public/Home";
import { Shop } from "./pages/public/Shop";
import { About } from "./pages/public/About";
import { Lookbook } from "./pages/public/Lookbook";
import { ProductDetail } from "./pages/public/ProductDetail";
import { Login } from "./pages/public/Login";
import { Register } from "./pages/public/Register";
import { Admin } from "./pages/admin/Admin";
import { Cart } from "./pages/dashboard/Cart";
import { Checkout } from "./pages/dashboard/Checkout";
import { PRODUCTS } from "./data";
import { Product, User } from "./types";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageParams, setPageParams] = useState<any>({});
  const [modalType, setModalType] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScienceOpen, setIsScienceOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  if (user?.role === "admin") {
    return (
      <Admin
        user={user}
        onLogout={() => {
          setUser(null);
          setCurrentPage("home");
        }}
      />
    );
  }

  const handleNavigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id: number) => {
    const idx = cartItems.findIndex((item) => item.id === id);
    if (idx > -1) {
      const newCart = [...cartItems];
      newCart.splice(idx, 1);
      setCartItems(newCart);
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "help":
        return "Help Center";
      case "returns":
        return "Returns Policy";
      case "warranty":
        return "Warranty Info";
      case "contact":
        return "Contact Us";
      case "privacy":
        return "Privacy Policy";
      case "terms":
        return "Terms of Service";
      default:
        return "";
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case "help":
        return (
          <p>
            FAQ and support documentation goes here. We are here to assist you
            24/7.
          </p>
        );
      case "returns":
        return (
          <p>
            We offer a 30-day money-back guarantee on all unused gear. Return
            shipping is free for elite members.
          </p>
        );
      case "warranty":
        return (
          <p>
            All Titan-Grip and Iron-Clad products come with a lifetime warranty
            against manufacturing defects.
          </p>
        );
      case "contact":
        return <p>Email us at support@gymate.com or call 1-800-GYMATE.</p>;
      case "privacy":
        return (
          <p>
            Your data is secure. We never sell your personal information to
            third parties.
          </p>
        );
      case "terms":
        return <p>By using our services, you agree to our terms of use...</p>;
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={handleNavigate}
            onOpenScience={() => setIsScienceOpen(true)}
            onAddToCart={addToCart}
          />
        );
      case "shop":
        return (
          <Shop
            filter={pageParams.filter}
            searchQuery={pageParams.search}
            onAddToCart={addToCart}
            onNavigate={handleNavigate}
          />
        );
      case "product-detail":
        const product = PRODUCTS.find((p) => p.id === pageParams.productId);
        if (!product) return <div>Product Not Found</div>;
        return (
          <ProductDetail
            product={product}
            onAddToCart={addToCart}
            onNavigate={handleNavigate}
          />
        );
      case "about":
        return <About onNavigate={handleNavigate} />;
      case "lookbook":
        return <Lookbook onNavigate={handleNavigate} />;
      case "cart":
        return (
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onNavigate={handleNavigate}
          />
        );
      case "checkout":
        if (!user) {
          return (
            <div className="pt-32 px-6 text-center">
              <p className="text-white mb-4">
                You must be logged in to checkout.
              </p>
              <Login
                onLogin={(u) => {
                  setUser(u);
                }}
                onNavigate={handleNavigate}
              />
            </div>
          );
        }
        return (
          <Checkout
            items={cartItems}
            onClear={() => setCartItems([])}
            onNavigate={handleNavigate}
          />
        );
      case "login":
        return (
          <Login
            onLogin={(u) => {
              setUser(u);
              handleNavigate("home");
            }}
            onNavigate={handleNavigate}
          />
        );
      case "register":
        return (
          <Register
            onLogin={(u) => {
              setUser(u);
              handleNavigate("home");
            }}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <Home
            onNavigate={handleNavigate}
            onOpenScience={() => setIsScienceOpen(true)}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <Header
        onNavigate={handleNavigate}
        // Changed from onOpenSearch={() => setIsSearchOpen(true)}
        onSearch={(q) => handleNavigate("shop", { search: q })}
        onOpenProfile={() => setIsProfileOpen(true)}
        cartCount={cartItems.length}
        user={user}
      />

      <main className="flex-grow bg-background-light dark:bg-background-dark">
        {renderView()}
      </main>

      <Footer onNavigate={handleNavigate} onOpenModal={setModalType} />

      <Modal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={getModalTitle()}
      >
        {getModalContent()}
      </Modal>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(q) => handleNavigate("shop", { search: q })}
      />

      <ScienceModal
        isOpen={isScienceOpen}
        onClose={() => setIsScienceOpen(false)}
      />

      {user && (
        <Profile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateUser={(u) => setUser(u)}
        />
      )}
    </div>
  );
};

export default App;
