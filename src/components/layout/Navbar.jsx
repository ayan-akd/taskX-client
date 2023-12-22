import { Link, NavLink, useNavigate } from "react-router-dom";
import userLogo from "../../assets/user.png";
import logo from "/demoLogo.png";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../shared/useAuth";
const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
              : "mr-1 font-semibold text-lg"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
              : "mr-1 font-semibold text-lg"
          }
          to="/allServices"
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
              : "mr-1 font-semibold text-lg"
          }
          to="/about"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
              : "mr-1 font-semibold text-lg"
          }
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>

      {user ? (
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending "
                : isActive
                ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
                : "mr-1 font-semibold text-lg"
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending "
                : isActive
                ? "font-extrabold text-white  mr-1 bg-rose p-3 rounded-lg"
                : "mr-1 font-semibold text-lg"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className="mx-auto navbar bg-base-100 bg-navBG opacity-90 sticky top-0 z-50 py-5"
      style={{}}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu></AiOutlineMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-200 rounded-box w-64"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <div className="flex items-center ">
            <img className="md:w-2/12 w-6/12 mr-1 md:mr-3" src={logo} alt="" />
            <span className="text-lg md:text-2xl">Task</span>{" "}
            <span className="text-rose text-lg md:text-2xl font-semibold">
              X
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex justify-between">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user && (
          <p className="text-lg font-semibold text-blueViolet">
            {user.displayName}
          </p>
        )}

        <div className="dropdown dropdown-end mr-3 ml-3">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user ? user?.photoURL : userLogo} alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">
                  <button>Login</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
