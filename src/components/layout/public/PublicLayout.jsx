import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import useAuth from "../../../hooks/useAuth";

export const PublicLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        <section className="layout__content layout__content-public">
          <Toaster richColors position="top-center" />
          {!auth._id ? <Outlet /> : <Navigate to="social" />}
        </section>
      </>
    );
  }
};
