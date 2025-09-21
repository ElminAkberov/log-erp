import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#060010] to-[#111] border-t border-[#3e3e3e] text-gray-400 py-6 text-center">
      <p>
        © {new Date().getFullYear()} 166 Logistics ERP. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
