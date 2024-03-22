import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import registerImg from "../../assets/img/register.svg";
import { GuestButton } from "../../helpers/GuestButton";
import { toast } from "sonner";
import { useState } from "react";
export const Register = () => {
  const { form, changed } = useForm({});
  const [loading, setLoading] = useState(false);

  const saveUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newUser = form;

    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      toast.success("User has been created Successfully");
      let registerForm = document.querySelector("#register-form");
      setTimeout(() => {
        registerForm.reset();
      }, 2000);
    } else {
      toast.error("Email or Nick already exists");
    }
    setLoading(false);
  };
  return (
    <>
      <div className="content__posts content__register">
        <h1 className="content__title">
          <span className="titlelogin">Sign up</span>
          <span className="titlelogin">& interact</span>
          <span className="titlelogin"> with the world.</span>
        </h1>
        <form className="form-register" id="register-form" onSubmit={saveUser}>
          <section className="form-divider">
            <div className="form-group">
              <label htmlFor="register_name">Name</label>
              <input
                type="text"
                name="name"
                required
                id="register_name"
                onChange={changed}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register_surname">Surname</label>
              <input
                type="text"
                name="surname"
                required
                id="register_surname"
                onChange={changed}
              />
            </div>
          </section>
          <div className="form-group">
            <label htmlFor="register_nick">Nick</label>
            <input
              type="text"
              name="nick"
              required
              id="register_nick"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="register_bio">biografy</label>
            <textarea
              type="text"
              name="bio"
              required
              onChange={changed}
              className="settings__textarea"
              id="register_bio"
            />
          </div>
          <div className="form-group">
            <label htmlFor="register_email">Email</label>
            <input
              type="email"
              name="email"
              required
              id="register_email"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="register_password">Password</label>
            <input
              type="password"
              name="password"
              required
              id="register_password"
              onChange={changed}
            />
          </div>

          {loading ? (
            <div className="Query_loader-public"></div>
          ) : (
            <button type="submit" className="button-register button-login">
              Register
            </button>
          )}
        </form>

        <h3 className="or">or</h3>

        <Link to="/login" className="button-register">
          Login with your account
        </Link>
      </div>
      <GuestButton />
      <header className="content__header content__header--public">
        <img src={registerImg} alt="" className="background-img-register" />
      </header>
    </>
  );
};
