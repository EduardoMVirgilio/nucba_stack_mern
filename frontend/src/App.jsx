import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, LogIn, LogOut, User } from "lucide-react";
import Style from "./styles/app.module.css";
import useUser from "./context/useUser";
function App() {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const reset = useUser((state) => state.reset);
  const logout = () => {
    reset();
    return navigate(0);
  };
  return (
    <>
      <header id={Style["main-header"]}>
        <nav id={Style["main-nav"]}>
          <Link to={"/"}>
            <Home />
          </Link>
          {!user && (
            <>
              <Link to={"/login"}>
                <LogIn />
              </Link>
              <Link to={"/register"}>
                <User />
              </Link>
            </>
          )}
        </nav>
        {user && (
          <form onSubmit={logout}>
            <button>
              <LogOut />
            </button>
          </form>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default App;
