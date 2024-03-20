import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { GetProfile } from "../../helpers/GetProfile";
import { UserList } from "../user/UserList";
import { useParams } from "react-router-dom";
export const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState();
  const [followingUsers, setFollowingUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(1);
    GetProfile(params.userID, setUserProfile);
  }, []);

  const getUsers = async (nextPage) => {
    const userToSearch = params.userID;
    setLoading(true);
    const request = await fetch(
      Global.url + "follow/followers/" + userToSearch + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    let cleanUsers = [];

    await data.follows.docs.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.user];
    });

    console.log(data.follows.docs);
    data.users = cleanUsers;

    if (data.users && data.status == "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowingUsers(data.following);

      if (users.length >= data.total - data.itemsPerPage) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Quienes siguen a {userProfile.name}</h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        followingUsers={followingUsers}
        setFollowingUsers={setFollowingUsers}
        setPage={setPage}
        page={page}
        more={more}
        loading={loading}
      />
    </>
  );
};
