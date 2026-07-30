import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { users, setUsers } = useContext(UserContext);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create new user
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,

      company: {
        name: formData.company,
      },

      username: "new_user",

      address: {
        street: "Dummy Street",
        suite: "Dummy Suite",
        city: "Dummy City",
        zipcode: "00000",
        geo: {
          lat: "0",
          lng: "0",
        },
      },

      website: "example.com",
    };

    setUsers([...users, newUser]);

    alert(`${formData.name} has been added successfully!`);

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        User Dashboard
      </h1>

      {/* Search */}
      <div className="mx-auto mb-8 max-w-4xl">
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm outline-none focus:border-blue-500"
        />
      </div>

     {/* Create User Form */}
<div className="mb-8 rounded-lg bg-white p-5 shadow">
  <h2 className="mb-5 text-2xl font-bold text-gray-800">
    Create New User
  </h2>

  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-700"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-700"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Enter phone"
        value={formData.phone}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-700"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Enter company"
        value={formData.company}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-700"
        required
      />
    </div>

    <button
      type="submit"
      className="mt-5 rounded-lg bg-gray-800 px-5 py-3 text-white transition hover:bg-black"
    >
      Create User
    </button>
  </form>
</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="rounded-lg bg-white p-4 shadow transition hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 font-semibold text-white">
                  {user.name.charAt(0)}
                </div>

                <h2 className="font-semibold text-gray-800">
                  {user.name}
                </h2>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">
                    Email:
                  </span>{" "}
                  {user.email}
                </p>

                <p>
                  <span className="font-medium text-gray-800">
                    Phone:
                  </span>{" "}
                  {user.phone}
                </p>

                <p>
                  <span className="font-medium text-gray-800">
                    Company:
                  </span>{" "}
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