/* eslint-disable react/prop-types */
import { MdDeleteForever, MdEdit } from "react-icons/md";
import ConfirmToast from "./ConfirmToast";
import toast from "react-hot-toast";
import { axiosPublic } from "./shared/useAxios";
import useAuth from "./shared/useAuth";
import UpdateModal from "./UpdateModal";
import { useState } from "react";
import { useDrag } from "react-dnd";
const TaskCard = ({ task }) => {
  const { user, handleAlert, refetch } = useAuth();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK", // This should be a constant string
    item: () => ({ id: task._id }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleDelete = (id) => {
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to Delete?",
      onConfirm: () => handleCancelConfirmed(id, confirmToastId),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };
  const handleCancelConfirmed = (id, confirmToastId) => {
    axiosPublic.delete(`/tasks/${id}?email=${user?.email}`).then((res) => {
      if (res.status === 201) {
        refetch();
        handleAlert("success", "Task deleted successfully");
        setTimeout(() => {
          toast.dismiss(confirmToastId);
        }, 2000);
      }
    });
  };
  const handleEdit = () => {
    setSelectedRowData(task);
  };
  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="shadow-xl bg-base-200 p-10">
        <p className="text-xl mb-2">{task?.taskName}</p>
        <p>{task?.description}</p>
        <p>Priority: {task?.priority}</p>
        <p>Deadline: {formatDate(task?.time)}</p>
        <p className="text-lg mb-2">
          Created by <span className="font-semibold">{task?.hostName}</span>
        </p>
        <div className="flex gap-5">
          <button
            className="btn bg-rose text-white hover:bg-rose border-none"
            onClick={() => handleEdit()}
          >
            <MdEdit className="text-2xl" />
            Edit
          </button>
          <button
            className="btn bg-rose text-white hover:bg-rose border-none"
            onClick={() => handleDelete(task?._id)}
          >
            <MdDeleteForever className="text-2xl" />
            Delete
          </button>
        </div>
      </div>
      {selectedRowData && (
        <UpdateModal
          setSelectedRowData={setSelectedRowData}
          rowData={selectedRowData}
          open={true}
        ></UpdateModal>
      )}
    </div>
  );
};

export default TaskCard;
