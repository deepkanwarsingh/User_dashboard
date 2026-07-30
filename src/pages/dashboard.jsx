import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    users,
    setUsers,
    loading,
    error,
  } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading users...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-red-100 px-8 py-6 text-red-700 shadow">
          <h2 className="text-xl font-bold">
            Failed to load users
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const matchName = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCompany =
      companyFilter === "" ||
      user.company.name === companyFilter;

    return matchName && matchCompany;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-5">

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">
            User Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage, search and create users
          </p>

          <div className="mt-5 inline-flex rounded-full bg-gray-900 px-5 py-2 text-white">
            Total Users: {filteredUsers.length}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Search Users
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
            />

            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
            >
              <option value="">All Companies</option>

              {[...new Set(users.map((user) => user.company.name))].map(
                (company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Create User */}
        <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Create New User
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="john@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="ABC Pvt Ltd"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="mt-6 rounded-xl bg-black px-6 py-3 font-medium text-white transition duration-200 hover:bg-gray-800"
            >
              Create User
            </button>
          </form>
        </div>

        {/* User Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {user.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">
                      Email
                    </p>
                    <p className="text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">
                      Phone
                    </p>
                    <p className="text-gray-500">
                      {user.phone}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">
                      Company
                    </p>
                    <p className="text-gray-500">
                      {user.company.name}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4 text-right">
                  <span className="font-medium text-black transition group-hover:underline">
                    View Details →
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;