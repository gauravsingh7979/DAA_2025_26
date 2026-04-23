import React from "react";

const Navbar = ({ title, subtitle }) => {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">React Project</p>
        <h1>{title}</h1>
        <p className="hero-copy">
          Cleanly separated visualizer with reusable components, dedicated
          sorting modules, and a live complexity panel.
        </p>
      </div>

      <div className="hero-badge">
        <span>Now showing</span>
        <strong>{subtitle}</strong>
      </div>
    </header>
  );
};

export default Navbar;
