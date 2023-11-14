// Logo.js
import React from "react";
import logo from "../images/logo.png";

function Logo() {
  const refreshPage = () => {
    window.location.reload(false); // false para recarregar do cache
  };

  return (
    <div className="logobox">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={refreshPage}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Logo;
