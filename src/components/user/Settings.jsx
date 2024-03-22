import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";
import { toast } from "sonner";
export const Settings = () => {
  const [saved, setSaved] = useState("Not-saved");

  const { auth, setAuth } = useAuth();

  const updateUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    let newDataUser = SerializeForm(e.target);

    delete newDataUser.file0;

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    console.log(data);
    if (data.status == "success" && data.userUpdated) {
      toast.success("Updated user");
      delete data.userUpdated.password;

      setAuth(data.userUpdated);
    } else {
      setSaved(data.message);
    }

    const fileInput = document.querySelector("#file");

    if (data.status == "success" && fileInput.files[0]) {
      const formData = new FormData();

      formData.append("avatar", fileInput.files[0]);

      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });

      const uploadedData = await uploadRequest.json();

      console.log(uploadedData);
      if (uploadedData.status == "success" && uploadedData.user) {
        toast.success("Image uploaded");
        delete uploadedData.user.password;

        setAuth(uploadedData.user);
      } else {
        toast.error("Image error");
      }

      setSaved(uploadedData.message);
    }
  };
  return (
    <>
      <header className="content__header ">
        <h1 className="content__title">Configuration</h1>
      </header>

      <div className="config__formulary-container">
        <form className="config-form" onSubmit={updateUser}>
          <div className="config-form__inputs-containers">
            <section className="settings-form__names">
              <div className="form-divider">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" defaultValue={auth.name} />
                </div>
                <div className="form-group">
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    name="surname"
                    defaultValue={auth.surname}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="nick">Nick</label>
                <input type="text" name="nick" defaultValue={auth.nick} />
              </div>
              <div className="form-group">
                <label htmlFor="bio">biografy</label>
                <textarea
                  type="text"
                  name="bio"
                  defaultValue={auth.bio}
                  className="settings__textarea"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" defaultValue={auth.email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
              </div>
            </section>

            <section className="settings-form__image-container">
              <div className="form-group">
                <label htmlFor="file0">Avatar</label>
                <div className="avatar">
                  <div className="general-info__container-avatar">
                    {auth.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + auth.image}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                    {auth.image == "default.png" && (
                      <img
                        src={avatar}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                  </div>
                </div>
              </div>
              <input
                type="file"
                name="avatar"
                id="file"
                className="settings-form__upload"
              />
            </section>
          </div>
          <input
            type="submit"
            value="Update"
            className="btn btn-success config__form-button"
          />
        </form>
      </div>
    </>
  );
};
