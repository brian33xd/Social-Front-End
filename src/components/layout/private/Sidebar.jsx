import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";

import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const { auth, counters, authUser } = useAuth();

  const { following, followed, publications } = counters;
  const [loading, setLoading] = useState(false);
  const { form, changed } = useForm({});

  const token = localStorage.getItem("token");

  const savePublication = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newPublication = form;
    newPublication.user = auth._id;

    const request = await fetch(Global.url + "publication/save", {
      method: "POST",
      body: JSON.stringify(newPublication),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      toast.success("¡Correctly published!");
    }
    const fileInput = document.querySelector("#file");

    if (data.status == "success" && fileInput.files[0]) {
      authUser();
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const fileRequest = await fetch(
        Global.url + "publication/upload/" + data.publication._id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        }
      );

      const imageData = await fileRequest.json();

      if (imageData.status == "success" && data.status == "success") {
        toast.success("¡Image correctly uploaded!");
      } else {
        toast.error("Error with the image");
      }
    }
    setLoading(false);
    const formulary = document.querySelector("#publication-form");
    formulary.reset();
  };

  return (
    <aside className="layout__aside">
      <main className="aside__container">
        <div className="aside__container-form">
          <form
            id="publication-form"
            className="container-form__form-post"
            onSubmit={savePublication}
          >
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                Share your status with your friends!
              </label>
              <textarea
                name="text"
                className="form-post__textarea"
                onChange={changed}
              />
            </div>

            <section className="form-post__buttons">
              <div className="form-post__inputs">
                <label htmlFor="file" className="form-post__label">
                  Upload an image
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="form-post__image"
                />
              </div>
              {loading ? (
                <div className="Query_loader-public"></div>
              ) : (
                <button type="submit" className="form-post__btn-submit">
                  Publish <i className="bx bx-send"></i>
                </button>
              )}
            </section>
          </form>
        </div>
      </main>
    </aside>
  );
};
