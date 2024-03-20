import { NavLink } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

export const Nav = () => {
  const { auth } = useAuth();

  const reloadProfile = () => {};
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <h3 className="menu-list__subtitle">MENU</h3>

          <NavLink
            to="/social/home"
            className={({ isActive }) =>
              isActive
                ? "menu-list__link menu-list__link-active"
                : "menu-list__link"
            }
          >
            <i className="bx bx-home nav__icon"></i>
            <span className="menu-list__title">Home</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink
            to="/social/feed"
            className={({ isActive }) =>
              isActive
                ? "menu-list__link-active menu-list__link"
                : "menu-list__link"
            }
          >
            <i className="bx bx-list-ul nav__icon"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
          <li className="menu-list__item">
            <NavLink
              to="/social/people"
              className={({ isActive }) =>
                isActive
                  ? "menu-list__link-active menu-list__link"
                  : "menu-list__link"
              }
            >
              <i className="bx bx-user-plus nav__icon"></i>

              <span className="menu-list__title">Community</span>
            </NavLink>
          </li>
        </li>

        <h3 className="menu-list__subtitle">PROFILE</h3>
        <li className="menu-list__item">
          <NavLink
            to={"/social/profile/" + auth._id}
            className={({ isActive }) =>
              isActive
                ? "menu-list__link-active menu-list__link menu-list__link-profile"
                : "menu-list__link"
            }
          >
            <i className="bx bx-user-circle nav__icon"></i>

            <span className="menu-list__title" onClick={reloadProfile}>
              Profile
            </span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink
            to="/social/settings"
            className={({ isActive }) =>
              isActive
                ? "menu-list__link-active menu-list__link"
                : "menu-list__link"
            }
          >
            <i className="bx bx-cog nav__icon"></i>
            <span className="menu-list__title">Settings</span>
          </NavLink>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="menu-list__item">
          <NavLink to="/social/logout" className="menu-list__link">
            <i className="bx bx-log-out nav__icon" />
            <span className="menu-list__title">Log out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
