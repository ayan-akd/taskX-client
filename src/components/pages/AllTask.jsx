import { Helmet } from "react-helmet";
import CustomContainer from "../CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";

const AllTask = () => {
  const { user, tasks, isLoading } = useAuth();
  const filterByEmail = tasks.filter((task) => task.hostEmail === user?.email);
  const todo = filterByEmail.filter((task) => task.status === "todo");
  const ongoing = filterByEmail.filter((task) => task.status === "ongoing");
  const completed = filterByEmail.filter((task) => task.status === "completed");
  return (
    <div>
      <Helmet>
        <title>TaskX | Manage Tasks</title>
      </Helmet>
      {isLoading ? (
        <CustomSpinner></CustomSpinner>
      ) : (
        <CustomContainer>
          <h1>Hi</h1>
        </CustomContainer>
      )}
    </div>
  );
};

export default AllTask;
