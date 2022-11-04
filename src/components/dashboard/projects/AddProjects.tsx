import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../../../firebase";
import { IProjectData } from "../interface";

const members = [{ value: "testuser3@test.com", label: "testuser3@test.com" }];
const technologyStack = [
  {
    value: "javascript",
    label: "Javascript",
  },
  {
    value: "reactjs",
    label: "React Js",
  },
];

const initialProjectData = {
  name: "",
  requirements: "",
  startDate: "",
  endDate: "",
  members: [],
  technologyStack: [],
  status: "",
};

const AddProjects = () => {
  const [projectData, setProjectData] =
    useState<IProjectData>(initialProjectData);
  console.log("projectData", projectData);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleMultiSelectChange = (
    name: string,
    data: MultiValue<{ value: string; label: string }>
  ) => {
    const stringArray = data.map((d) => d.value);
    setProjectData({ ...projectData, [name]: stringArray });
  };

  const addProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await addDoc(collection(db, "projects"), projectData);
    if (data) {
      toast.success("Project added successfully!");
    }
    setProjectData(initialProjectData);
  };

  return (
    <div className="container mx-auto px-6 py-7">
      <h1 className="text-lg font-medium">Add Projects</h1>
      <div>
        <form className="rounded px-8 pt-6 pb-8 w-full">
          <label className="block text-black text-sm font-bold mt-2">
            Name
          </label>
          <input
            name="name"
            onChange={handleInputChange}
            value={projectData.name}
            className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
          />
          <label className="block text-black text-sm font-bold mt-2">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={projectData.requirements}
            onChange={handleInputChange}
            className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
          />
          <label className="block text-black text-sm font-bold mt-2">
            Start Date
          </label>
          <input
            name="startDate"
            type="date"
            value={projectData.startDate}
            onChange={handleInputChange}
            className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
          />
          <label className="block text-black text-sm font-bold mt-2">
            End Date
          </label>
          <input
            name="endDate"
            type="date"
            value={projectData.endDate}
            onChange={handleInputChange}
            className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
          />
          <label className="block text-black text-sm font-bold mt-2">
            Members
          </label>
          <Select
            isMulti
            name="members"
            value={members.filter((m) => projectData.members.includes(m.value))}
            options={members}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(data) => handleMultiSelectChange("members", data)}
          />
          <label className="block text-black text-sm font-bold mt-2">
            Technology stack
          </label>
          <Select
            isMulti
            name="technologyStack"
            value={technologyStack.filter((m) =>
              projectData.technologyStack.includes(m.value)
            )}
            options={technologyStack}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(data) =>
              handleMultiSelectChange("technologyStack", data)
            }
          />
          <label className="block text-black text-sm font-bold mb-1">
            Status
          </label>
          <select
            name="status"
            onChange={handleInputChange}
            value={projectData.status}
            className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
          >
            <option value="" selected disabled>
              -- Choose status --
            </option>
            <option value="pending">Pending</option>
            <option value="in_progress">In possess</option>
            <option value="done">Done</option>
            <option value="block">Block</option>
          </select>
          <button
            className="my-4 float-right text-white bg-darkBlue-101 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="submit"
            onClick={addProject}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProjects;
