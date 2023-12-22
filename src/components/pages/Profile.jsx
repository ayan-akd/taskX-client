import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";
const Profile = () => {
  const { user, userData, roleLoading } = useAuth();
  return (
    <div>
      {roleLoading ? (
        <CustomSpinner></CustomSpinner>
      ) : (
        <div className="w-full mt-12 flex justify-center ">
          <div className="h-56 w-72 absolute flex justify-center items-center">
            <img
              className="object-cover h-20 w-20 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>

          <div
            className="
          h-56
          mx-4
          w-5/6
          bg-rose
          rounded-3xl
          shadow-md
          sm:w-80 sm:mx-0
        "
          >
            <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5"></div>

            <div
              className="
            bg-white
            h-auto
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
            shadow-xl
          "
            >
              <div className="w-full h-1/2 mt-12 mb-6 px-2 flex flex-col justify-center items-center space-y-1">
                <h1 className="font-bold">{user?.displayName}</h1>
                <h1 className="font-bold">
                  Role: {userData?.role?.toUpperCase()}
                </h1>
                <h1 className="text-gray-700 text-sm">{user?.email}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
