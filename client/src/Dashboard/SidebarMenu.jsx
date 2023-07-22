import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import './Sidemenubar.css';

function SidebarMenu() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto d-flex justify-content-between flex-column">
          <div>
            <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-2">
              <span className="ms-1 fs-4 d-none d-sm-inline">Royal</span>
            </a>
            <hr className="text-secondary d-none d-sm-block" />
            <ul class="nav nav-pills flex-column">
              <li class="nav-item text-white fs-4 ml-1 py-2 py-sm-0">
                <a
                  href="/"
                  class="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                </a>
              </li>
              <li class="nav-item text-white fs-4 ml-1 py-2 py-sm-0">
                <a
                  href="/orders"
                  class="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-table"></i>
                  <span className="ms-3 d-none d-sm-inline">Orders</span>
                </a>
              </li>
              <li class="nav-item text-white fs-4 ml-1 py-2 py-sm-0">
                <a
                  href="/expenses"
                  class="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-grid"></i>
                  <span className="ms-3 d-none d-sm-inline">Expenses</span>
                </a>
              </li>
              <li class="nav-item text-white fs-4 ml-1 py-2 py-sm-0">
                <a
                  href="/users"
                  class="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-people"></i>
                  <span className="ms-3 d-none d-sm-inline">Users</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
