import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import CreateOrEditTechnology from "./CreateOrEditTechnology";
import { fetchTechnologies, setTechnologyId } from "./redux/actions";
import { db } from "../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Technologies = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [technologies] = useAppSelector((state) => [
    state.technology.technologies,
  ]);

  useEffect(() => {
    dispatch(fetchTechnologies());
  }, []);

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Id", field: "id", hide: true },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (field: any) => (
        <a
          className="text-blue-500 underline"
          rel="noreferrer"
          target="_blank"
          title={field.data.image}
          href={field.data.image}
        >
          {field.data.image}
        </a>
      ),
    },
    {
      headerName: "Resources",
      field: "resources.value",
      valueGetter: (p: any) =>
        p.data.resources.map((r: any) => r.value).join(", "),
    },
    { headerName: "Status", field: "status" },
    {
      headerName: "Edit",
      field: "edit",
      cellRenderer: (field: any) => (
        <button
          onClick={() => {
            console.log(field.data.id);

            dispatch(setTechnologyId(field.data.id));
            setShowModal(true);
          }}
        >
          <i className="fas fa-edit mr-2 text-sm text-green-700"></i>
        </button>
      ),
      width: 90,
    },
    {
      headerName: "Delete",
      field: "delete",
      cellRenderer: (field: any) => (
        <button
          className="ml-2"
          onClick={async () => {
            const techDoc = doc(db, "technology", field.data.id);
            await deleteDoc(techDoc);
            dispatch(fetchTechnologies());
          }}
        >
          <i className="fas fa-trash mr-2 text-sm text-red-600"></i>
        </button>
      ),
      width: 90,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-7">
      <div className="flex justify-end">
        <button
          className="bg-green-700 text-white px-3 py-1 rounded-md"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus mr-2 text-sm"></i>
          Add
        </button>
      </div>
      {showModal ? (
        <CreateOrEditTechnology setShowModal={setShowModal} />
      ) : null}
      <div
        className="ag-theme-alpine mt-8"
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={technologies || []}
          pagination={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Technologies;
