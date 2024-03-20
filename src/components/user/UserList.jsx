import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import PropTypes, { arrayOf } from "prop-types";
import ReactTimeAgo from "react-time-ago";
import { toast } from "sonner";
export const UserList = ({
  setFollowingUsers,
  followingUsers,
  users,
  getUsers,
  loading,
  more,
  page,
  setPage,
}) => {
  const { auth, authUser } = useAuth();

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };

  const follow = async (userID) => {
    const requestBody = { followed: userID };

    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      authUser();
      setFollowingUsers([...followingUsers, userID]);
      toast.success("Now following");
    }
  };

  const unfollow = async (userID) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      authUser();
      let filter = followingUsers.filter(
        (followingUserID) => userID !== followingUserID
      );
      setFollowingUsers(filter);
      toast.warning("Unfollowed an user");
    }
  };

  return (
    <>
      <div className="content__posts content__users">
        {users.map((user) => {
          return (
            <article className="posts__post users__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/profile/" + user._id}
                    className="post__image-link"
                  >
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
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
                    <Link
                      to={"/social/profile/" + user._id}
                      className="user-info__name"
                    >
                      {user.name} {user.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link
                      to={"/social/profile/" + user._id}
                      className="user-info__create-date"
                    >
                      <ReactTimeAgo date={user.created_at} locale="en-EN" />
                    </Link>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {user._id !== auth._id && (
                <div className="post__buttons post__buttons-follow">
                  {!followingUsers.includes(user._id) && (
                    <button
                      className="post__button post__button-follow"
                      onClick={() => follow(user._id)}
                    >
                      Follow
                    </button>
                  )}
                  {followingUsers.includes(user._id) && (
                    <button
                      className="post__button"
                      onClick={() => unfollow(user._id)}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {more && (
        <div className="content__container-btn button-more">
          {loading ? (
            <div className="Query_loader Query_loader-users"></div>
          ) : (
            ""
          )}
          <button className="content__btn-more-post" onClick={nextPage}>
            See more
          </button>
        </div>
      )}
    </>
  );
};

UserList.propTypes = {
  setFollowingUsers: PropTypes.func,
  followingUsers: arrayOf(PropTypes.string),
  users: arrayOf(PropTypes.object),
  getUsers: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
};
