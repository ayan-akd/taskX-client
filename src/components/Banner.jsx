import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
            Manage Your Projects Effectively
            </h1>
            <p className="mb-5 text-white">
            Simplify your workflow, collaborate seamlessly, and achieve
              project success. Empower your team to excel with our powerful
              project management tools.
            </p>
            <motion.a
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              href="/dashboard/profile"
              className="btn bg-rose hover:bg-rose text-white border-none"
            >
              Let’s Explore
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
