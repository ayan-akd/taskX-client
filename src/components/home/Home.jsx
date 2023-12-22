import { Helmet } from "react-helmet";
import Banner from "../Banner";
import Section from "../Section";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskX | Home</title>
      </Helmet>
      <Banner></Banner>
      {/* next section  */}
      <Section></Section>
    </div>
  );
};

export default Home;
