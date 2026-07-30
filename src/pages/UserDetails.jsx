import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserDetails = () => {
  const { id } = useParams();
  const { users } = useContext(UserContext);

  const [user, setUser] = useState(
    users.find((u) => u.id === Number(id))
  );
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">User Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="mb-6 inline-block rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-black"
        >
          ← Back
        </Link>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-gray-800">
            {user.name}
          </h1>
          <p className="mt-1 text-gray-500">@{user.username}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Personal Details
            </h2>

            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Company
            </h2>

            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
            <p><strong>Business:</strong> {user.company.bs}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Address
            </h2>

            <p>{user.address.street}</p>
            <p>{user.address.suite}</p>
            <p>{user.address.city}</p>
            <p>{user.address.zipcode}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Geo Location
            </h2>

            <p><strong>Latitude:</strong> {user.address.geo.lat}</p>
            <p><strong>Longitude:</strong> {user.address.geo.lng}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDetails;