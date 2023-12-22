import { Helmet } from "react-helmet";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomContainer from "../CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";
import TaskCard from "../TaskCard";

const AllTask = () => {
  const { user, tasks, isLoading } = useAuth();
  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
  const filterByEmail = tasks.filter((task) => task.hostEmail === user?.email);
  const todo = filterByEmail.filter((task) => task.status === "todo");
  const ongoing = filterByEmail.filter((task) => task.status === "ongoing");
  const completed = filterByEmail.filter((task) => task.status === "completed");

  const handleDrop = (taskId, newStatus) => {
    // Update the task status in the backend
    console.log(taskId, newStatus);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
            <h1 className="text-2xl text-center font-semibold mb-3 mt-10">
              To-Do
            </h1>

            <hr className=" bg-base-300 w-3/4 mx-auto" />

            <section className="mb-10 py-10">
              <div className="text-center flex flex-wrap gap-10 justify-around items-center">
                {todo &&
                  todo?.map((task) => (
                    <TaskCard
                      task={task}
                      key={task._id}
                      onDrop={() => handleDrop(task._id, "todo")}
                    ></TaskCard>
                  ))}
              </div>
            </section>

            {/* ongoing section  */}
            <h1 className="text-2xl text-center font-semibold mb-3">Ongoing</h1>

            <hr className=" bg-base-300 w-3/4 mx-auto" />

            <section className="mb-10 py-10">
              <div className="text-center flex flex-wrap gap-10 justify-around items-center">
                {ongoing &&
                  ongoing?.map((task) => (
                    <TaskCard
                      task={task}
                      key={task._id}
                      onDrop={() => handleDrop(task._id, "ongoing")}
                    ></TaskCard>
                  ))}
              </div>
            </section>

            {/* completed section  */}
            <h1 className="text-2xl text-center font-semibold mb-3">
              Completed
            </h1>

            <hr className=" bg-base-300 w-3/4 mx-auto" />

            <section className="mb-10 py-10">
              <div className="text-center flex flex-wrap gap-10 justify-around items-center">
                {completed &&
                  completed?.map((task) => (
                    <TaskCard
                      task={task}
                      key={task._id}
                      onDrop={() => handleDrop(task._id, "completed")}
                    ></TaskCard>
                  ))}
              </div>
            </section>
          </CustomContainer>
        )}
      </div>
    </DndProvider>
  );
};

export default AllTask;
