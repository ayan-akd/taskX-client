import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";
import { motion as m } from "framer-motion";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer p-10 max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-start">
        <aside className="flex items-center gap-2 flex-col md:flex-row">
          <img className="w-4/12 md:w-2/12 mr-3" src="/demoLogo.png" alt="" />
          <div>
          <p className="text-2xl lg:text-4xl">
            Task
            <span className="font-semibold text-rose">
              X
            </span>
            <br />
            Organizing Relaiable Tasks Since 1965
          </p>
          </div>
        </aside>
        <nav className="flex flex-col items-center">
          <header className="text-2xl lg:text-4xl mb-1 lg:mb-5">
            Social{" "}
            <span className="font-semibold text-rose">
              Links
            </span>
          </header>
          <div className="grid grid-flow-col gap-4 text-3xl text-rose">
          <m.a
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            target="_blank" href="https://www.facebook.com/akd444/">
              <FaFacebook></FaFacebook>
            </m.a>
            <m.a 
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            target="_blank" href="https://www.instagram.com/akd420v2/">
              <FaInstagram></FaInstagram>
            </m.a>
            <m.a
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            target="_blank" href="https://www.linkedin.com/in/ayan-kumar-akd/">
              <FaLinkedin></FaLinkedin>
            </m.a>
            <m.a
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            target="_blank" href="https://github.com/ayan-akd">
              <FaGithub></FaGithub>
            </m.a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
