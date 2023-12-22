import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
import CustomContainer from "../CustomContainer";
import Footer from "../layout/Footer";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import CustomButton from "../CustomButton";
import lott from "../../assets/lottie.json";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>TaskX | Not Found</title>
      </Helmet>
      <NavBar></NavBar>
      <motion.div />
      <CustomContainer>
        <div className=" text-center">
          <div className="mb-5">
            <div className="md:w-96 mx-auto">
              <Lottie animationData={lott} />
            </div>
            <h2 className="md:text-6xl text-3xl font-bold">
              WHOOPS… PAGE NOT FOUND
            </h2>
            <p className="font-semibold my-3">
              Page does not exist or some other error occurred. Go to our{" "}
              <span className="text-rose">
                <Link to={"/"}>Home page</Link>
              </span>
            </p>
            <Link to={"/"}>
              <CustomButton>Back to Home</CustomButton>
            </Link>
          </div>
        </div>
      </CustomContainer>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
