import React from "react";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";
import PropTypes, { arrayOf, func } from "prop-types";
import ReactTimeAgo from "react-time-ago";
import { toast } from "sonner";
export const PublicationList = ({
  publications,
  more,
  setMore,
  page,
  loading,
  setLoading,
  setPage,
  getPublications,
}) => {
  const { auth, authUser } = useAuth();

  const token = localStorage.getItem("token");
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
    setLoading(true);
  };
  const deletePublication = async (publicationID) => {
    const request = await fetch(
      Global.url + "publication/remove/" + publicationID,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await request.json();

    authUser();
    setPage(1);
    setMore(true);
    getPublications(1, true);

    toast.error("Publication deleted!");
  };
  return (
    <>
      <div className="content__posts content__posts-feed">
        {publications.map((publication) => {
          return (
            <article className="posts__post" key={publication._id}>
              <div className="post__container">
                <section>
                  <div className="post__image-user">
                    <Link
                      to={"/social/profile/" + publication.user._id}
                      className="post__image-link"
                    >
                      {publication.user.image != "default.png" && (
                        <img
                          src={
                            Global.url + "user/avatar/" + publication.user.image
                          }
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                      {publication.user.image == "default.png" && (
                        <img
                          src={avatar}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="post__body">
                    <div className="post__user-info">
                      <a href="#" className="user-info__name">
                        {publication.user.name} {publication.user.surname}
                      </a>
                      <span className="user-info__divider"> | </span>
                      <a href="#" className="user-info__create-date">
                        <ReactTimeAgo
                          date={publication.created_at}
                          locale="en-EN"
                        />
                      </a>
                    </div>

                    <h4 className="post__content">{publication.text}</h4>
                  </div>
                </section>
                {publication.file && (
                  <img
                    className="post__image"
                    src={Global.url + "publication/media/" + publication.file}
                  />
                )}
                {auth._id == publication.user._id && (
                  <div className="post__buttons">
                    <button
                      onClick={() => deletePublication(publication._id)}
                      href="#"
                      className="post__button"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}

        {more && (
          <div className="content__container-btn button-more">
            <button className="content__btn-more-post" onClick={nextPage}>
              See more
            </button>
            {loading ? <div className="Query_loader"></div> : ""}
          </div>
        )}
      </div>
    </>
  );
};

PublicationList.propTypes = {
  publications: arrayOf(PropTypes.object),

  setMore: func,
  setLoading: func,
  page: Number,
  setPage: func,
  getPublications: func,
};
