import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";

import useAuth from "../../../hooks/useAuth";
import { Toaster } from "sonner";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        <section className="layout__content">
          <Header />

          <main className="content__main">
            <Toaster richColors expand={true} />
            {auth._id ? <Outlet /> : navigate("/")}
          </main>
        </section>
      </>
    );
  }
};
