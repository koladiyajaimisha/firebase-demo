import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { ITechnology } from "../interface";
import { fetchTechnologies, setTechnologyId } from "./redux/actions";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

interface Props {
  setShowModal: (f: boolean) => void;
}

const initialData = {
  name: "",
  image: "",
  resources: [{ value: "" }],
  status: "",
};

const CreateOrEditTechnology: React.FC<Props> = ({ setShowModal }) => {
  const [technologyData, setTechnologyData] =
    useState<ITechnology>(initialData);
  const dispatch = useAppDispatch();

  const [technologyId, technologies] = useAppSelector((state) => [
    state.technology.technologyId,
    state.technology.technologies,
  ]);

  useEffect(() => {
    if (technologyId) {
      const selectedData = technologies.find((t) => t.id === technologyId);
      selectedData && setTechnologyData(selectedData);
    }
  }, [technologyId]);

  const onModalClose = () => {
    technologyId && dispatch(setTechnologyId(""));
    setTechnologyData(initialData);
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTechnologyData({ ...technologyData, [name]: value });
  };

  const handleResourceLinkChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newArray = technologyData.resources.map((r, i) => {
      if (i === index) {
        return { value };
      } else {
        return r;
      }
    });
    setTechnologyData({ ...technologyData, resources: newArray });
  };

  const AddTechnology = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (technologyId) {
        const techDoc = doc(db, "technology", technologyId);
        await updateDoc(techDoc, { ...technologyData });
      } else {
        await addDoc(collection(db, "technology"), technologyData);
      }
      dispatch(fetchTechnologies());
      onModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 'file' comes from the Blob or File API
      const storage = getStorage();
      const starsRef = ref(storage, file?.name);
      await uploadBytes(starsRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      await getDownloadURL(starsRef).then((url: any) => {
        setTechnologyData({ ...technologyData, image: url });
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto max-w-lg w-full">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-100 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold">
                {technologyId ? "Edit" : "Add"}
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={onModalClose}
              >
                <i className="fas fa-close mr-2 text-sm"></i>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className="rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mt-2">
                  Name
                </label>
                <input
                  name="name"
                  onChange={handleInputChange}
                  value={technologyData.name}
                  className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-black text-sm font-bold mt-2">
                  Image
                </label>
                <input
                  type="file"
                  onChange={uploadImage}
                  className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black"
                />
                <div className="flex items-center mt-2">
                  <label className="block text-black text-sm font-bold">
                    Resources Links
                  </label>
                  <i
                    onClick={() =>
                      setTechnologyData({
                        ...technologyData,
                        resources: [...technologyData.resources, { value: "" }],
                      })
                    }
                    className="fas fa-plus text-green-700 mr-2 text-md cursor-pointer pl-2"
                  ></i>
                </div>
                {technologyData.resources.map((r, i) => (
                  <input
                    name="resources"
                    value={r.value}
                    onChange={(e) => handleResourceLinkChange(e, i)}
                    className="shadow outline-none appearance-none border border-darkBlue-101 rounded w-full py-2 px-1 text-black mb-3"
                  />
                ))}
                <label className="block text-black text-sm font-bold mb-1">
                  Status
                </label>
                <select
                  name="status"
                  onChange={handleInputChange}
                  value={technologyData.status}
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
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={onModalClose}
              >
                Close
              </button>
              <button
                className="text-white bg-darkBlue-101 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
                onClick={AddTechnology}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrEditTechnology;
