import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="h-full"
          >
            <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-white">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Company:</span>{" "}
                  {user.company.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;