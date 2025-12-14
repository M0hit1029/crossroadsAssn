import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchDriversAsync,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../features/driversSlice";
import { ToastContainer, toast } from "react-toastify";
import Modal from "./Modal";

function RescueDashboard() {
  const dispatch = useAppDispatch();
  const { drivers, loading, error } = useAppSelector((state) => state.drivers);

  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    dispatch(fetchDriversAsync());
  }, [dispatch]);

  const handleEdit = (driver) => {
    setIsEditing(true);
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      username: driver.username,
      email: driver.email,
      phone: driver.phone,
      website: driver.website,
    });
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold">
            Are you sure you want to delete this driver?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                dispatch(deleteDriver(id));
                toast.success("Driver deleted successfully");
                closeToast();
              }}
              className="bg-gradient-to-br from-red-400 to-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-200 px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && editingDriver) {
      const updatedDriver = {
        ...editingDriver,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
      };
      dispatch(updateDriver(updatedDriver));
      setIsEditing(false);
      setEditingDriver(null);
    } else if (isAdding) {
      const newDriver = {
        id: Math.max(0, ...drivers.map((d) => d.id)) + 1,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "", lng: "" },
        },
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };
      dispatch(addDriver(newDriver));
      setIsAdding(false);
    }

    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setEditingDriver(null);
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-xl">Loading rescue drivers...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-5 animate-fadeIn">
      <h1 className="text-center text-gray-900 mb-8 text-[2.5rem] font-bold tracking-tight max-md:text-[1.5rem]">
        Crossroads Solutions Internship Assignment
      </h1>

      <button
        className="bg-gray-900 text-white py-3.5 px-7 border-none rounded-lg cursor-pointer text-base font-semibold mb-5 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] active:translate-y-0"
        onClick={handleAdd}
      >
        <span className="text-xl font-bold">+</span>
        Add New Driver
      </button>

      <Modal
        isOpen={isEditing || isAdding}
        onClose={handleCancel}
        title={isEditing ? "Edit Driver" : "Add New Driver"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="mb-0">
            <label className="block mb-2 font-semibold text-gray-900 text-[0.95rem]">
              Driver Name:
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Enter driver name"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base box-border transition-all duration-200 focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] placeholder:text-gray-400"
            />
          </div>
          <div className="mb-0">
            <label className="block mb-2 font-semibold text-gray-900 text-[0.95rem]">
              Username:
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              placeholder="Enter username"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base box-border transition-all duration-200 focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] placeholder:text-gray-400"
            />
          </div>
          <div className="mb-0">
            <label className="block mb-2 font-semibold text-gray-900 text-[0.95rem]">
              Email:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="driver@example.com"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base box-border transition-all duration-200 focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] placeholder:text-gray-400"
            />
          </div>
          <div className="mb-0">
            <label className="block mb-2 font-semibold text-gray-900 text-[0.95rem]">
              Phone:
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              placeholder="1-555-555-5555"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base box-border transition-all duration-200 focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] placeholder:text-gray-400"
            />
          </div>
          <div className="mb-0">
            <label className="block mb-2 font-semibold text-gray-900 text-[0.95rem]">
              Website:
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              required
              placeholder="https://example.com"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base box-border transition-all duration-200 focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-3 mt-2 pt-2">
            <button
              type="submit"
              onClick={() =>
                toast.success(isEditing ? "Driver Updated" : "Driver Added", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                })
              }
              className="bg-gray-900 text-white py-3 px-6 border-none rounded-lg cursor-pointer text-base font-semibold transition-all duration-300 flex-1 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              {isEditing ? "Update Driver" : "Add Driver"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 text-gray-900 py-3 px-6 border-none rounded-lg cursor-pointer text-base font-semibold transition-all duration-300 flex-1 hover:bg-gray-300 hover:-translate-y-px"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <div
        className="
  overflow-x-auto
  backdrop-blur-md
  bg-white/15
  rounded-xl
  border border-white/30
  shadow-[0_4px_6px_rgba(0,0,0,0.07)]
  transition-shadow duration-300
  hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]
"
      >
        <h2 className="text-gray-900 mb-5 text-[2rem] p-5 pb-0 font-semibold text-center">
          Drivers List
        </h2>
        <table className="w-full border-collapse text-[0.95rem]">
          <thead className="bg-black/60 backdrop-blur-md text-white">
            <tr>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Driver ID
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Driver Name
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Username
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Email
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Phone
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Website
              </th>
              <th className="py-3 px-3 text-left border-b border-gray-200 font-semibold uppercase text-[0.85rem] tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                className="transition-all duration-200 hover:bg-white/20 hover:scale-[1.005]"
              >
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.id}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.name}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.username}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.email}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.phone}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  {driver.website}
                </td>
                <td className="py-3 px-3 text-left border-b border-gray-200">
                  <div className="flex gap-2">
                    <button
                      className="bg-gray-900 text-white py-2 px-4 border-none rounded-md cursor-pointer text-[0.9rem] font-medium transition-all duration-200 flex items-center gap-1 shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      onClick={() => handleEdit(driver)}
                      disabled={isEditing || isAdding}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gradient-to-br from-red-400 to-red-600 text-white py-2 px-4 border-none rounded-md cursor-pointer text-[0.9rem] font-medium transition-all duration-200 flex items-center gap-1 shadow-[0_2px_4px_rgba(248,113,113,0.3)] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(248,113,113,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      onClick={() => handleDelete(driver.id)}
                      disabled={isEditing || isAdding}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RescueDashboard;
