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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        User Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="rounded-lg bg-white p-4 shadow hover:shadow-lg">
              <h2 className="mb-2 text-xl font-semibold">
                {user.name}
              </h2>

              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>

              <p className="text-gray-700">
                <strong>Phone:</strong> {user.phone}
              </p>

              <p className="text-gray-700">
                <strong>Company:</strong> {user.company.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;