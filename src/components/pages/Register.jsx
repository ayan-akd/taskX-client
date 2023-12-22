import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import useAuth from "../shared/useAuth";
import { axiosPublic } from "../shared/useAxios";

const Register = () => {
  const navigate = useNavigate();
  // const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setCustomLoading] = useState(false);
  const {
    handleAlert,
    googleLogIn,
    createUser,
    setLoading,
    fbLogIn,
    userData,
  } = useAuth();

  // const handleUploadImage = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);

  //     const response = await fetch("https://api.imgur.com/3/image", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `${import.meta.env.IMGUR_TOKEN}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.data.link);
  //       return data.data.link;
  //     } else {
  //       console.error("Failed to upload image to Imgur.");
  //     }
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value || "https://i.ibb.co/Ky7xfRv/user.png";
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    }

    setCustomLoading(true);
    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        createRoles(email, name, photo);
        handleAlert("success", "User Created Successfully");
        setCustomLoading(false);
        navigate("/dashboard/profile");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
        setCustomLoading(false);
      });
    // }

    form.reset();
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

  // const checkUserExists = (email) => {
  //   axiosSecure.get(`${baseUrl}/users?email=${email}`).then((res) => {
  //     if (res.data?.email == email) {
  //       setUserData(res.data);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };

  const checkUserExists = (email) => {
    if (userData.email == email) {
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
  };

  return (
    <div>
      <Helmet>
        <title>TaskX | Register</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">
              Welcome to <span className="text-black">Task</span>
              <span className="text-rose">X</span>
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Image Url
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter Your Image Url Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
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
                  autoComplete="new-password"
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
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
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
                  <p>Signup with Google</p>
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-rose"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
