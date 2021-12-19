import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const renderLogoutLink = () => {
    const token = sessionStorage.getItem("__tok");
    if (token) {
      return (
        <Link onClick={() => logout()} to="/login" data-testid="logout">
          <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-200 border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">
            Logout
          </span>
        </Link>
      );
    }
  };

  const logout = () => {
    sessionStorage.removeItem("__tok");
  };

  return (
    <header data-testid="header">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <Link to="/" title="There is no place like Localhost!">
          <span className="flex items-center flex-shrink-0 text-teal-200 hover:text-blue-900 mr-6">
            <span className="text-xl tracking-tight ">Home</span>
          </span>
        </Link>
        <div>{renderLogoutLink()}</div>
      </nav>
    </header>
  );
};

export default Header;
