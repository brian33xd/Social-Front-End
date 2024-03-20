import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import avatar from "../../../assets/img/user.png";
import { useEffect, useState } from "react";
import { Search } from "../../user/Search";

export const Header = () => {
  const { auth, counters } = useAuth();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState(false);

  let actualLocation = location.pathname;

  useEffect(() => {
    setShowSidebar(!actualLocation.includes("/profile/"));
    setActiveMenu(false);
  }, [location.pathname]);

  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <section className="header__container">
          <Search />
          {showSidebar && (
            <section className="new-kinda-of-card">
              <div className="card">
                <div className="bottom-section">
                  <main className="top-section-card">
                    <section className="card_names-container">
                      <span className="title">
                        {auth.name} {auth.surname}
                      </span>
                      <p className="container-names__nickname">{auth.nick}</p>
                    </section>
                    <section className="card_image-container">
                      {" "}
                      <NavLink
                        to={"/social/profile/" + auth._id}
                        className="list-end__link-image"
                      >
                        {auth.image != "default.png" && (
                          <img
                            src={Global.url + "user/avatar/" + auth.image}
                            className="list-end__img "
                            alt="Foto de perfil"
                          />
                        )}
                        {auth.image == "default.png" && (
                          <img
                            src={avatar}
                            className="list-end__img"
                            alt="Foto de perfil"
                          />
                        )}
                      </NavLink>
                    </section>
                  </main>
                  <div className="row row1">
                    <NavLink
                      to={"/social/following/" + auth._id}
                      className="item"
                    >
                      <span className="big-text">{counters.following}</span>
                      <span className="regular-text">Following</span>
                    </NavLink>
                    <NavLink
                      to={"/social/followers/" + auth._id}
                      className="item"
                    >
                      <span className="big-text">{counters.followed}</span>
                      <span className="regular-text">Fans</span>
                    </NavLink>
                    <NavLink
                      to={"/social/profile/" + auth._id}
                      className="item"
                    >
                      <span className="big-text">{counters.publications}</span>
                      <span className="regular-text">Publications</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
      {!activeMenu ? (
        <i
          className="bx bx-menu navbar__menu-button"
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
        ></i>
      ) : (
        <i
          className="bx bx-x navbar__menu-button"
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
        ></i>
      )}

      <div className={activeMenu ? "navbar__menu-active" : ""}>
        <Nav />
      </div>
    </header>
  );
};
