import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import avatar from "../../../assets/img/user.png";
export const TopNav = () => {
  const { auth } = useAuth();
  return (
    <nav className="topNav_container">
      <section className="navSearcher">
        <h6 className="icon">icon</h6>
      </section>
      <ul className="topNav_list">
        <li className="list-end__item">
          <NavLink
            to={"/social/profile/" + auth._id}
            className="list-end__link"
          >
            <span className="topNav_nick">{auth.nick}</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink
            to={"/social/profile/" + auth._id}
            className="list-end__link-image"
          >
            {auth.image != "default.png" && (
              <img
                src={Global.url + "user/avatar/" + auth.image}
                className="list-end__img"
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
        </li>
      </ul>
    </nav>
  );
};
