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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">

        <Link
          to="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mb-6 text-3xl font-bold">
          {user.name}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded border p-4">
            <h2 className="mb-3 text-xl font-semibold">
              Personal Details
            </h2>

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-3 text-xl font-semibold">
              Company
            </h2>

            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
            <p><strong>Business:</strong> {user.company.bs}</p>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-3 text-xl font-semibold">
              Address
            </h2>

            <p>{user.address.street}</p>
            <p>{user.address.suite}</p>
            <p>{user.address.city}</p>
            <p>{user.address.zipcode}</p>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-3 text-xl font-semibold">
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