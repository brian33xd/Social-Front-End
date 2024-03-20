import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { Link, NavLink } from "react-router-dom";
export const Search = () => {
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchUsers = async (e) => {
    const query = e.target.value;

    if (query.length >= 1) {
      setActive(true);
      setLoading(true);
    } else {
      setActive(false);
    }
    const request = await fetch(Global.url + "user/search/" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setUsers(data.articulos);
      setLoading(false);
    }
  };
  return (
    <section className="header__search">
      <input
        type="search"
        placeholder="Buscar..."
        className="header__input"
        onChange={searchUsers}
      />
      {loading ? <div className="Query_loader-black"></div> : ""}
      <i className="bx bx-search header__logo"></i>
      {active && (
        <ul className="header__search-list" id="search_list">
          {users.length >= 1 ? (
            users.map((user) => {
              return (
                <NavLink
                  to={"/social/profile/" + user._id}
                  className="search__user"
                  key={user._id}
                >
                  <section className="search__image-container">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="search__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="search__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </section>
                  <section className="search__user-name">
                    <div>
                      <h2>
                        {user.name} {user.surname}
                      </h2>
                      <h3>{user.nick}</h3>
                    </div>
                  </section>
                </NavLink>
              );
            })
          ) : (
            <li>
              {" "}
              <h3>There is no result</h3>
            </li>
          )}
        </ul>
      )}
    </section>
  );
};
