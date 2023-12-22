import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import CustomContainer from "./CustomContainer";
import lott from "../assets/wip.json";
import CustomButton from "./CustomButton";
const Wip = () => {
  return (
    <div>
      <motion.div />
      <CustomContainer>
        <div className=" text-center">
          <div className="mb-5">
            <div className="md:w-96 mx-auto">
              <Lottie animationData={lott} />
            </div>
            <h2 className="md:text-6xl text-3xl mb-5 font-bold">
              Work in Progress
            </h2>
            <Link to={"/"}>
              <CustomButton>Back to Home</CustomButton>
            </Link>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Wip;
