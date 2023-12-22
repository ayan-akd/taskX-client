import { motion } from "framer-motion";

const Section = () => {
  const userTypes = [
    {
      title: "Developers",
      description:
        "Streamline your project workflow, collaborate with your team, and manage tasks efficiently.",
      img: "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Corporate Professionals",
      description:
        "Enhance project coordination, monitor progress, and ensure seamless communication within your organization.",
      img: "https://plus.unsplash.com/premium_photo-1663011469263-1d8a6caf2000?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Bankers",
      description:
        "Efficiently manage financial projects, track milestones, and improve collaboration with your financial team.",
      img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more user types as needed
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-rose">
          Who Can Benefit from Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes?.map((userType, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl text-center font-bold mb-4 text-rose">
                {userType.title}
              </h3>
              <img src={userType.img}/>
              <p className="text-gray-700">{userType.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
