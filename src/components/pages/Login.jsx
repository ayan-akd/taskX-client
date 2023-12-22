import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../shared/useAuth";
import { axiosPublic } from "../shared/useAxios";
import { TbFidgetSpinner } from "react-icons/tb";

const Login = () => {
  const [loading, setCustomLoading] = useState(false);
  const { handleAlert, googleLogIn, logIn, setLoading, fbLogIn, userData } =
    useAuth();

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setCustomLoading(true);
    logIn(email, password)
      .then(() => {
        navigate("/dashboard/profile");
        handleAlert("success", "User LoggedIn Successfully");
        setCustomLoading(false);
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
        setCustomLoading(false);
      });
  };

  const handleGoogleLogIn = async () => {
    setLoading(true);
    setCustomLoading(true);
    try {
      const result = await googleLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate("/dashboard/profile");
        handleAlert("success", "User LoggedIn Successfully");
      } else {
        createRoles(
          result?.user?.email,
          result?.user?.displayName,
          result?.user?.photoURL
        );
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setCustomLoading(false);
    }
  };

  const handleFBLogIn = async () => {
    setLoading(true);
    setCustomLoading(true);
    try {
      const result = await fbLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate("/dashboard/profile");
        handleAlert("success", "User LoggedIn Successfully");
      } else {
        createRoles(
          result?.user?.email,
          result?.user?.displayName,
          result?.user?.photoURL
        );
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setCustomLoading(false);
    }
  };

  const checkUserExists = (email) => {
    if (userData?.email == email) {
      return true;
    } else {
      return false;
    }
  };

  const createRoles = (email, name, photo) => {
    const userData = {
      email: email,
      name: name,
      role: "guest",
      photo: photo,
    };
    axiosPublic.post(`/users`, userData);
    navigate("/dashboard/profile");
  };

  return (
    <div className="">
      <Helmet>
        <title>TaskX | Login</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl text-rose font-bold">Log In</h1>
            <p className="text-sm ">Sign in to access your account</p>
          </div>
          <form
            onSubmit={handleLogIn}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-rose w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div>
            <button
              onClick={handleGoogleLogIn}
              className="bg-rose w-full rounded-md py-3 text-white my-2"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <FcGoogle size={25} />
                  <p>Continue with Google</p>
                </div>
              )}
            </button>
            <button
              onClick={handleFBLogIn}
              className="bg-rose w-full rounded-md py-3 text-white my-2"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <FaFacebook size={25} />
                  <p>Continue with Facebook</p>
                </div>
              )}
            </button>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-rose-500 text-rose"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
