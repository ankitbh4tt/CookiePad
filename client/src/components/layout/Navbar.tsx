import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Home, Search, MessageSquare, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                CookiePad
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <NavLinks />
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLinks />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search posts, authors..."
      className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
  </div>
);

const NavLinks = () => (
  <div className="flex items-center space-x-6">
    <NavLink to="/" icon={<Home size={20} />} text="Home" />
    <NavLink
      to="/messages"
      icon={<MessageSquare size={20} />}
      text="Messages"
    />
    <NavLink
      to="/notifications"
      icon={<Bell size={20} />}
      text="Notifications"
    />
    <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
  </div>
);
interface NavLinkProps {
  to: string;
  icon: ReactNode;
  text: string;
}
const NavLink = ({ to, icon, text }: NavLinkProps) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLinks = () => (
  <div className="space-y-4 px-4">
    <MobileNavLink to="/" icon={<Home size={20} />} text="Home" />
    <MobileNavLink
      to="/messages"
      icon={<MessageSquare size={20} />}
      text="Messages"
    />
    <MobileNavLink
      to="/notifications"
      icon={<Bell size={20} />}
      text="Notifications"
    />
    <MobileNavLink to="/profile" icon={<User size={20} />} text="Profile" />
  </div>
);

const MobileNavLink = ({ to, icon, text }: NavLinkProps) => (
  <Link
    to={to}
    className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors py-2"
  >
    {icon}
    <span className="text-base font-medium">{text}</span>
  </Link>
);

const UserMenu = () => (
  <div className="flex items-center space-x-4">
    <motion.img
      whileHover={{ scale: 1.1 }}
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      alt="User"
      className="w-8 h-8 rounded-full cursor-pointer"
    />
  </div>
);

export default Navbar;
