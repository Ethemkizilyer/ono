import React, { useEffect, useState } from "react";
import { data } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, getAudience } from "../features/audienceSlice";
import { AppDispatch } from "../app/store";
import Navbar from "../components/Navbar";

export type User = {
  id: number;
  name: string;
  tags: string[];
  status: string;
  created_at: string;
};

const Audience = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, person } = useSelector((state: any) => state.audience);

  const colors = ["orange", "yellow", "aqua"];

  const [filterData, setFilterData] = useState<User[]>(users);
  useEffect(() => {
    dispatch(getAudience());
  }, [dispatch]);
  useEffect(() => {
    setFilterData(users);
  }, [users]);

  const [selectedTag, setSelectedTag] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleSearch = (e: any) => {
    const searchText = e.target.value.toLowerCase().trim();

    const filteredBySearch = users.filter((item: any) =>
      item.name.toLowerCase().includes(searchText)
    );
    // setFilterData(filteredBySearch)
    applyFilters(filteredBySearch, selectedTag, selectedStatus);
  };

  const handleTagFilter = (e: any) => {
    const selectedTag = e.target.value;
    setSelectedTag(selectedTag);
    let filteredByTag: any = {};
    if (selectedTag === "tümü") {
      filteredByTag = users;
    } else {
      filteredByTag = users.filter((item: any) =>
        item.tags.includes(selectedTag)
      );
    }

    applyFilters(filteredByTag, selectedTag, selectedStatus);
  };

  const handleStatusFilter = (e: any) => {
    const selectedStatus = e.target.value;
    setSelectedStatus(selectedStatus);
    let filteredByStatus: any = {};
    switch (selectedStatus) {
      case "active":
        filteredByStatus = users.filter(
          (item: any) => item.status === selectedStatus
        );
        break;
      case "passive":
        filteredByStatus = users.filter(
          (item: any) => item.status === selectedStatus
        );
        break;
      case "tümü":
        filteredByStatus = users;
        break;
      default:
        break;
    }

    applyFilters(filteredByStatus, selectedTag, selectedStatus);
  };

  const applyFilters = (
    filteredData: any,
    selectedTag: any,
    selectedStatus: any
  ) => {
    if (selectedTag !== "" && selectedStatus !== "") {
      if (selectedTag === "tümü" && selectedStatus === "tümü") {
        const filteredDataByBoth = filteredData;
        setFilterData(filteredDataByBoth);
      } else if (selectedTag === "tümü") {
        const filteredDataByBoth = users.filter(
          (item: any) => item.status === selectedStatus
        );
        setFilterData(filteredDataByBoth);
      } else if (selectedStatus === "tümü") {
        const filteredDataByBoth = users.filter((item: any) =>
          item.tags.includes(selectedTag)
        );
        setFilterData(filteredDataByBoth);
      } else {
        const filteredDataByBoth = filteredData.filter(
          (item: any) =>
            item.tags.includes(selectedTag) && item.status === selectedStatus
        );
        setFilterData(filteredDataByBoth);
      }
    } else if (selectedTag !== "") {
      setFilterData(filteredData);
    } else if (selectedStatus !== "") {
      setFilterData(filteredData);
    } else {
      setFilterData(filteredData);
    }
  };

  const [selectedRow, setSelectedRow] = useState<any>(null); 

  const handleDelete = (item: any) => {
  
      dispatch(deleteUser(item?.id));
      setSelectedRow(null); 
    
  };

  const [showModal, setShowModal] = useState(false); 

  const [updatedData, setUpdatedData] = useState<any>(null); 
  const handleUpdate = () => {

    if (selectedRow !== null && updatedData !== null) {
      const updatedList = filterData.map((item) =>
        item.id === selectedRow.id ? updatedData : item
      );

      setFilterData(updatedList);
      setShowModal(false); 
      setSelectedRow(null); 
      setUpdatedData(null); 
    }
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row); 
    setUpdatedData({ ...row }); 
    setShowModal(true); 
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    dispatch(editUser({ ...updatedData, [e.target.name]: e.target.value }));
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    setFilterData(
      filterData.map((item: any) =>
        item.id === updatedData.id
          ? { ...updatedData, [e.target.name]: e.target.value }
          : item
      )
    );
  };
  return (
    <div className="app-content">
      <Navbar/>
      <div className="flex justify-between items-center px-3 my-2">
        <div>
          <p>Audience List</p>
        </div>
        <div className="flex gap-2">
          <span className="search-box">
            <input
              className="search-audience"
              placeholder="Search..."
              type="text"
              onChange={handleSearch}
            />
          </span>
          <select
            id="tagFilter"
            value={selectedTag}
            className="selectbox-1 px-2"
            onChange={handleTagFilter}
          >
            <option value="tümü">All</option>
            {Array.from(new Set(data.flatMap((item) => item.tags))).map(
              (tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
          <select
            id="statusFilter"
            className="selectbox-2 ps-2 pe-12"
            value={selectedStatus}
            onChange={handleStatusFilter}
          >
            <option value="tümü">All</option>
            <option value="active">Active</option>
            <option value="passive">Passive</option>
          </select>
        </div>
      </div>
      <div className="audience-list relative overflow-x-auto max-h-[750px] shadow-md sm:rounded-lg rounded-md border-2 border-gray-200">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Audience Name
              </th>
              <th scope="col" className="px-28 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData?.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 flex items-center gap-1">
                  {item.tags.map((i, index) => (
                    <span
                      style={{
                        padding: "5px 8px",
                        fontSize: "12px",
                        borderRadius: "5px",
                        background: `${colors[index]}`,
                      }}
                    >
                      {i}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="text-white"
                    style={{
                      padding: "5px 8px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      background: `${
                        item.status === "active" ? "green" : "red"
                      }`,
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="flex items-center px-6 py-4">
                  <button
                    data-modal-target="crud-modals"
                    type="button"
                    data-modal-toggle="crud-modals"
                    onClick={() => handleEdit(item)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div
            id="crud-modals"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-500 justify-center items-center w-full h-full flex bg-[#3a393985]"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative opacity-2 rounded-lg shadow bg-gray-300">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update User
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={updatedData?.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product name"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleUpdate}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Onayla</button>
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default Audience;
