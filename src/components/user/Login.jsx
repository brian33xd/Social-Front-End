import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import background from "../../assets/img/background.svg";
import { GuestButton } from "../../helpers/GuestButton";
import { toast } from "sonner";

export const Login = () => {
  const { form, changed } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userToLogin = form;

    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuth(data.user);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Loggin successfully");
    } else {
      toast.error("Error, wrong data");
    }

    setLoading(false);
  };

  return (
    <>
      <header className="content__header content__header--public">
        <img src={background} alt="" className="content__header-background" />
      </header>
      <GuestButton />
      <div className="content__posts content__login">
        <h1 className="content__title">
          <span className="titlelogin">Log in</span>
          <span className="titlelogin">& connect</span>
          <span className="titlelogin"> with others.</span>
        </h1>

        <form onSubmit={loginUser} className="form-login">
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              name="email"
              id="loginEmail"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              name="password"
              id="loginPassword"
              onChange={changed}
            />
          </div>
          {loading ? (
            <div className="Query_loader-public"></div>
          ) : (
            <button type="submit" className="button-register button-login">
              Login
            </button>
          )}
        </form>

        <h3 className="or">or</h3>

        <Link to="register/" className="button-register">
          Create new account
        </Link>
      </div>
    </>
  );
};
