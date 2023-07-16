import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SidebarMenu() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-3 min-vh-100">
          <a className="text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2">
            <i className="fs-4 bi bi-speedometer"></i>
            <span className="ms-1 fs-4">Brand</span>
          </a>
          <hr className="text-secondary" />
          <ul class="nav nav-pills flex-column">
            <li class="nav-item text-white fs-4">
              <a href="#" class="nav-link text-white fs-5" aria-current="page">
                <i className="bi bi-speedometer2"></i>
                <span className="ms-2">Dashboard</span>
              </a>
            </li>
            <li class="nav-item text-white fs-4">
              <a href="#" class="nav-link text-white fs-5" aria-current="page">
                <i className="bi bi-house"></i>
                <span className="ms-2">Home</span>
              </a>
            </li>
            <li class="nav-item text-white fs-4">
              <a href="#" class="nav-link text-white fs-5" aria-current="page">
                <i className="bi bi-table"></i>
                <span className="ms-2">Orders</span>
              </a>
            </li>
            <li class="nav-item text-white fs-4">
              <a href="#" class="nav-link text-white fs-5" aria-current="page">
                <i className="bi bi-grid"></i>
                <span className="ms-2">Product</span>
              </a>
            </li>
            <li class="nav-item text-white fs-4">
              <a href="#" class="nav-link text-white fs-5" aria-current="page">
                <i className="bi bi-people"></i>
                <span className="ms-2">Customers</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
