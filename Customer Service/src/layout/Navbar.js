import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bookstore Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Book
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/author">
                Author
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/publisher">
                Publisher
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Category">
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/Customer">
                Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Customer">
                Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}