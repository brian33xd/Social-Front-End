import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PublicationList } from "../publication/PublicationList";
import { Sidebar } from "../layout/private/Sidebar";

export const Feed = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setMore(true);
    getPublications(1, true);
  }, [params.userID]);

  const getPublications = async (nextPage = 1, showNews = false) => {
    if (showNews) {
      setPublications([]);
      setPage(1);
      nextPage = 1;
    }
    const request = await fetch(Global.url + "publication/feed/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      let newPublications = data.publications.docs;

      if (!showNews && publications.length >= 1) {
        newPublications = [...publications, ...data.publications.docs];
      }

      setPublications(newPublications);

      if (
        !showNews &&
        publications.length + data.publications.limit >=
          data.publications.totalDocs
      ) {
        setMore(false);
      }

      console.log(data.publications);
      if (data.publications.totalPages <= 1) {
        setMore(false);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button
          className="content__button"
          onClick={() => getPublications(1, true)}
        >
          Mostrar nuevas
        </button>
      </header>
      <Sidebar />
      <PublicationList
        publications={publications}
        page={page}
        more={more}
        loading={loading}
        setLoading={setLoading}
        getPublications={getPublications}
        setMore={setMore}
        setPage={setPage}
      />
    </>
  );
};
