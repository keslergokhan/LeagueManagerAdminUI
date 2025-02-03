import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";


export const LeftMenuComponent = () => {

  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    // Function to handle dropdown clicks
    const handleDropdownClick = (event:any) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest('.dropdown');

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains('open');

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll('.sidebar-menu .dropdown');
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('open');
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add('open');
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll('.sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link');

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener('click', handleDropdownClick);
    });

    // Function to open submenu based on current route
    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll('.sidebar-menu .dropdown');
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll('.sidebar-submenu li a');
        submenuLinks.forEach((link) => {
          if (link.getAttribute('href') === location.pathname || link.getAttribute('to') === location.pathname) {
            dropdown.classList.add('open');
          }
        });
      });
    };

    // Open the submenu that contains the open route
    openActiveDropdown();



    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener('click', handleDropdownClick);
      });

    };
  }, [location.pathname]);


  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

    return (<>
        <aside className={sidebarActive ? "sidebar active " : mobileMenu ? "sidebar sidebar-open" : "sidebar"}>
        <button onClick={mobileMenuControl} type="button" className="sidebar-close-btn">
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link to="/" className="sidebar-logo">
            <img
              src="assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </Link>
        </div>
        <div className="sidebar-menu-area">
           
          <ul className="sidebar-menu" id="sidebar-menu">
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:home-smile-angle-outline" className="menu-icon" />
                <span>Dashboard</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />AI
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-2" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto" /> CRM
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-3" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-info-main w-auto" /> eCommerce
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-4" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-danger-main w-auto" />
                    Cryptocurrency
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-5" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-success-main w-auto" /> Investment
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-6" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-purple w-auto" /> LMS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/index-7" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-info-main w-auto" /> NFT &amp; Gaming
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="sidebar-menu-group-title">Application</li>
            <li>
              <NavLink to="/home" className={(navData) =>
                navData.isActive ? "active-page" : ""
              }>
                <Icon icon="mage:email" className="menu-icon" />
                <span>Anasayfa</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={(navData) =>
                navData.isActive ? "active-page" : ""
              }>
                <Icon icon="mage:email" className="menu-icon" />
                <span>Blog</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/season" className={(navData) =>
                navData.isActive ? "active-page" : ""
              }>
                <Icon icon="mage:email" className="menu-icon" />
                <span>Sezon</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/team" className={(navData) =>
                navData.isActive ? "active-page" : ""
              }>
                <Icon icon="mage:email" className="menu-icon" />
                <span>Takım</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>);
}
