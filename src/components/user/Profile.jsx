import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { GetProfile } from "../../helpers/GetProfile";
import { NavLink, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PublicationList } from "../publication/PublicationList";
import useAuth from "../../hooks/useAuth";
import { Sidebar } from "../layout/private/Sidebar";
import { toast } from "sonner";
export const Profile = () => {
  const [iFollow, setIFollow] = useState(false);
  const { auth } = useAuth();
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [publications, setPublications] = useState([]);

  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const params = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIFollow(false);
    setPublications([]);
    setMore(true);
    getPublications(1, true);
    getDataUser();
    getCounters();
  }, [params.userID]);

  const getDataUser = async () => {
    let dataUser = await GetProfile(params.userID, setUser);
    if (dataUser.following && dataUser.following[0]._id) setIFollow(true);
  };
  const getCounters = async () => {
    const request = await fetch(Global.url + "user/counters/" + params.userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data) {
      setCounters(data);
    }
  };

  const follow = async (userID) => {
    const requestBody = { followed: userID };

    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      setIFollow(true);
      toast.success("Now following");
    }
  };

  const unfollow = async (userID) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      setIFollow(false);
      toast.warning("Unfollowed an user");
    }
  };

  const getPublications = async (nextPage = 1, newProfile = false) => {
    const request = await fetch(
      Global.url + "publication/user/" + params.userID + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      let newPublications = data.publications.docs;

      if (!newProfile && publications.length >= 1) {
        newPublications = [...publications, ...data.publications.docs];
      }

      if (newProfile) {
        newPublications = data.publications.docs;
        setMore(true);
        setPage(1);
      }
      setPublications(newPublications);
      if (
        !newProfile &&
        publications.length + data.publications.limit >=
          data.publications.totalDocs
      ) {
        setMore(false);
      }

      if (data.publications.totalPages <= 1) {
        setMore(false);
      }
    }
  };

  return (
    <div className="profile_layout">
      <section className="layout__aside aside__profile">
        <div className="card">
          <section className="card__old-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                {user.image != "default.png" && (
                  <img
                    src={Global.url + "user/avatar/" + user.image}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
                {user.image == "default.png" && (
                  <img
                    src={avatar}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
              </div>
            </div>
            <div className="bottom-section">
              <span className="title">
                {user.name} {user.surname}
              </span>
              <p className="container-names__nickname">{user.nick}</p>
              <div className="row row1">
                <NavLink to={"/social/following/" + user._id} className="item">
                  <span className="big-text">{counters.following}</span>
                  <span className="regular-text">Following</span>
                </NavLink>
                <NavLink to={"/social/followers/" + user._id} className="item">
                  <span className="big-text">{counters.followed}</span>
                  <span className="regular-text">Fans</span>
                </NavLink>
                <NavLink to={"/social/profile/" + user._id} className="item">
                  <span className="big-text">{counters.publications}</span>
                  <span className="regular-text">Publications</span>
                </NavLink>
              </div>
            </div>
          </section>

          <section className="card__new-info">
            <p className="card__bio">{user.bio}</p>
            {user._id != auth._id && !iFollow && (
              <button
                className="post__button post__button-follow"
                onClick={() => follow(user._id)}
              >
                Follow
              </button>
            )}
            {iFollow && (
              <button
                className="post__button post__button-unfollow"
                onClick={() => unfollow(user._id)}
              >
                Unfollow
              </button>
            )}
          </section>
        </div>
      </section>
      {user._id == auth._id && (
        <section className="layout__publication-profile">
          <Sidebar />
        </section>
      )}

      <PublicationList
        publications={publications}
        page={page}
        more={more}
        getPublications={getPublications}
        setMore={setMore}
        setPage={setPage}
      />
    </div>
  );
};
