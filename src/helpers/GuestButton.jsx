import React from "react";
import { Global } from "./Global";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

export const GuestButton = () => {
  const { setAuth } = useAuth();
  const loginGuestUser = async (e) => {
    e.preventDefault();

    const user = {
      email: "guest123@gmail.com",
      password: "contraseña",
    };
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(user),
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

      toast.success("Logging successfully");
    }
  };
  return (
    <div className="guest_button-container">
      <button className="button__guest" onClick={loginGuestUser}>
        Try as a guest <i className="bx bx-user bx-icon"></i>
      </button>
    </div>
  );
};
