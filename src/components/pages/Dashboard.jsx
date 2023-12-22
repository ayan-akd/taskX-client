import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../shared/useAuth";
import { CgProfile } from "react-icons/cg";
import { Toaster } from "react-hot-toast";
import Footer from "../layout/Footer";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "/demoLogo.png";
import { FaTasks } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-rose text-white mr-1"
              : "mr-1"
          }
          to={`/dashboard/profile`}
        >
          <CgProfile></CgProfile>
          My Profile
        </NavLink>
      </li>
      <div>
        <hr />
      </div>
      <>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-extrabold bg-rose text-white mr-1"
                : "mr-1"
            }
            to={`/dashboard/add-task`}
          >
            <IoMdAdd></IoMdAdd>
            Add Tasks
          </NavLink>
        </li>
        <div>
          <hr />
        </div>
      </>
      <div>
        <hr />
      </div>
      <>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-extrabold bg-rose text-white mr-1"
                : "mr-1"
            }
            to={`/dashboard/all-task`}
          >
            <FaTasks></FaTasks>
            Manage Tasks
          </NavLink>
        </li>
        <div>
          <hr />
        </div>
      </>
    </>
  );
  return (
    <div>
      {/* navbar section */}
      <div className="">
        <div className="navbar max-w-screen-xl mx-auto p-4">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                htmlFor="my-drawer-2"
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
            <Link to={"/"}>
              <div className="flex items-center ">
                <img
                  className="md:w-2/12 w-6/12 mr-1 md:mr-3"
                  src={logo}
                  alt=""
                />
                <span className="text-lg md:text-2xl">Task</span>{" "}
                <span className="text-rose text-lg md:text-2xl font-semibold">
                  X
                </span>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-bottom dropdown-end flex items-center">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <img src="/user.png" />
                    )}
                  </div>
                </label>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row text-center items-center">
                <Link to={"/login"}>
                  <motion.button className="btn bg-rose text-white btn-xs md:btn-md hover:bg-rose border-none">
                    Login
                  </motion.button>
                </Link>
                <p className="text-lg mx-2">or</p>
                <Link to={"/register"}>
                  <motion.button className="btn bg-rose text-white btn-xs md:btn-md hover:bg-rose border-none">
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* dashboard section */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="min-h-[calc(100vh-256px)] lg:min-h-[calc(100vh-296px)]">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side z-0">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-fit min-h-full text-base-content">
            {/* Sidebar content here */}
            <div className="text-center mt-5">
              <h1 className="text-rose font-bold">{user?.displayName}</h1>
              <h1 className="font-semibold">{user?.email}</h1>
            </div>
            <div className="md:mt-20 mt-32">{navLinks}</div>
            <div className="mt-48 flex items-end ">
              <div>
                <hr />
              </div>
              <li>
                <a
                  className="text-xl flex justify-center items-center"
                  onClick={handleLogout}
                >
                  <BiLogOutCircle></BiLogOutCircle>
                  <p>Logout</p>
                </a>
              </li>
              <div>
                <hr />
              </div>
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default Dashboard;
