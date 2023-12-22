import { Helmet } from "react-helmet";

import CustomContainer from "../CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";
import TaskCard from "../TaskCard";
import { useDrop } from "react-dnd";
import { axiosPublic } from "../shared/useAxios";

const AllTask = () => {
  const { user, tasks, isLoading, handleAlert, refetch } = useAuth();

  const handleTodoDrop = (item) => {
    // Handle task drop in Todo section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "todo" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOngoingDrop = (item) => {
    // Handle task drop in Ongoing section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "ongoing" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCompletedDrop = (item) => {
    // Handle task drop in Completed section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "completed" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const [, todoDrop] = useDrop({
    accept: "TASK",
    drop: handleTodoDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, ongoingDrop] = useDrop({
    accept: "TASK",
    drop: handleOngoingDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, completedDrop] = useDrop({
    accept: "TASK",
    drop: handleCompletedDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
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
          <h1 className="text-center text-5xl font-bold">
            Manage <span className="text-rose">Tasks</span>
          </h1>
          {/* TO Do  */}
          <h1 className="text-2xl text-center font-semibold mb-3 mt-10">
            To-Do
          </h1>

          <hr className=" bg-base-300 w-3/4 mx-auto" />

          <section className="mb-10 py-10" ref={todoDrop}>
            <div className="text-center flex flex-wrap gap-10 justify-around items-center">
              {todo &&
                todo?.map((task) => (
                  <TaskCard key={task._id} task={task}></TaskCard>
                ))}
            </div>
          </section>

          {/* ongoing section  */}
          <h1 className="text-2xl text-center font-semibold mb-3">Ongoing</h1>

          <hr className=" bg-base-300 w-3/4 mx-auto" />

          <section className="mb-10 py-10" ref={ongoingDrop}>
            <div className="text-center flex flex-wrap gap-10 justify-around items-center">
              {ongoing &&
                ongoing?.map((task) => (
                  <TaskCard key={task._id} task={task}></TaskCard>
                ))}
            </div>
          </section>

          {/* completed section  */}
          <h1 className="text-2xl text-center font-semibold mb-3">Completed</h1>

          <hr className=" bg-base-300 w-3/4 mx-auto" />

          <section className="mb-10 py-10" ref={completedDrop}>
            <div className="text-center flex flex-wrap gap-10 justify-around items-center">
              {completed &&
                completed?.map((task) => (
                  <TaskCard key={task._id} task={task}></TaskCard>
                ))}
            </div>
          </section>
        </CustomContainer>
      )}
    </div>
  );
};

export default AllTask;
