import { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "@/utils/adminService";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import AdminLayout from "@/components/ui/admin/AdminLayout";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch(() => toast.error("Failed to fetch users"));
  }, []);

  const handleDelete = (id: number) => {
    deleteUser(id)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("User deleted");
      })
      .catch(() => toast.error("Failed to delete user"));
  };

  return (
    <AdminLayout>
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.fullName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.createdAt}</td>
              <td className="p-2">
                <Button variant="destructive" onClick={() => handleDelete(u.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default ManageUsers;
