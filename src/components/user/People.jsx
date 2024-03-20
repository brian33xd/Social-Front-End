import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

import { UserList } from "./UserList";
export const People = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.users && data.status == "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowingUsers(data.following);
      setLoading(false);
      if (users.length >= data.total - data.itemsPerPage) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Community</h1>
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
