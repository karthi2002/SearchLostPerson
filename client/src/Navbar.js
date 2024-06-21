import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaUser } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdPersonSearch } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const Navbar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue);
  };

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <TiThMenu size={24} style={{ color: "#1A1A1A" }} />
      </button>
      <a className="navbar-brand" href="/">
        <MdPersonSearch size={26} />
        &nbsp;Person
      </a>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item px-3">
            <NavLink exact='true' className="nav-link" activeClassName="active" to="/view">
              VIEW MISSING PERSONS
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink exact='true' className="nav-link" activeClassName="active" to="/raise">
              RAISE COMPLAINT
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <div className="input-group">
              <div className="form-outline">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  value={inputValue}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="button" className="btn-3" onClick={handleSearchClick}>
                <IoMdSearch size={22} color="#fff" />
              </button>
            </div>
          </li>
          <li className="nav-item px-3">
            <NavLink exact='true' className="nav-link" activeClassName="active" to="/user">
              <FaUser size={22} style={{ color: "black" }} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
