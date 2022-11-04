import { AgGridReact } from "ag-grid-react";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchProjectsData } from "./redux/actions";

const AllProjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [projectsList, isFetchingProjects, authUser] = useAppSelector(
    (state) => [
      state.projects?.projectsList,
      state.projects?.isFetchingProjects,
      state.auth.authUser,
    ]
  );

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Id", field: "id", hide: true },
    { headerName: "Status", field: "status" },
    { headerName: "Start Date", field: "startDate" },
    { headerName: "End Date", field: "endDate" },
    {
      headerName: "Created By",
      field: "createdBy",
      hide: authUser?.role === "mentor",
    },
    {
      headerName: "Edit",
      field: "edit",
      hide: authUser?.role === "employee",
      cellRenderer: (field: any) => (
        <button
          onClick={() => {
            navigate(`/project/edit/${field.data.id}`);
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
      hide: authUser?.role === "employee",
      cellRenderer: (field: any) => (
        <button
          className="ml-2"
          onClick={async () => {
            const techDoc = doc(db, "projects", field.data.id);
            await deleteDoc(techDoc);
            dispatch(fetchProjectsData());
          }}
        >
          <i className="fas fa-trash mr-2 text-sm text-red-600"></i>
        </button>
      ),
      width: 90,
    },
  ];

  useEffect(() => {
    dispatch(fetchProjectsData());
  }, [authUser]);

  const onRecordClick = (row: any) => {
    if (row.colDef.field !== "edit" && row.colDef.field !== "delete") {
      const data = row.data;
      navigate(`/project/${data.id}`);
    }
  };

  if (isFetchingProjects && !projectsList.length) {
    return (
      <div className="absolute top-1/2 left-1/2 ">
        <div
          className="w-12 h-12 rounded-full animate-spin
  border-4 border-solid border-darkBlue-101 border-t-transparent"
        ></div>
      </div>
    );
  }

  return (
    <div className="px-5 py-5">
      <h1 className="text-xl">Projects</h1>
      <div
        className="ag-theme-alpine mt-8"
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={projectsList || []}
          pagination={true}
          onCellClicked={onRecordClick}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AllProjects;
