import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "./firebase-key";
import toast from "react-hot-toast";
import { axiosPublic, baseUrl } from "../shared/useAxios";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axiosPublic.get(`/users/${loggedUser?.email}`).then((res) => {
          setUserData(res.data);
          setRoleLoading(false);
        });
        // axiosPublic
        //   .post(`/jwt`, loggedUser, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        //     console.log(res.data);
        //   });
      }
      //  else {
      //   axiosPublic
      //     .post(`/logout`, loggedUser, { withCredentials: true })
      //     .then((res) => {
      //       console.log(res.data);
      //     });
      // }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  // const githubProvider = new GithubAuthProvider();

  const fbLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, fbProvider);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, passwords) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passwords);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    handleAlert("warn", "User Logged Out");
    return signOut(auth);
  };

  const handleAlert = (type, message) => {
    toast(message, {
      icon:
        (type == "success" && "✅") ||
        (type == "warn" && "⚠️") ||
        (type == "error" && "❌"),
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `${baseUrl}/tasks?email=${user?.email}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  const authInfo = {
    handleAlert,
    loading,
    user,
    createUser,
    logIn,
    logOut,
    googleLogIn,
    setLoading,
    fbLogIn,
    userData,
    roleLoading,
    tasks,
    isLoading,
    refetch,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
