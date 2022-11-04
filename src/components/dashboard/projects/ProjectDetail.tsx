import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { IProjectData } from "../interface";
import { fetchProjectsData } from "./redux/actions";

const ProjectDetail: React.FC = () => {
  const [projectsList, isFetchingProjects, authUser] = useAppSelector(
    (state) => [
      state.projects?.projectsList,
      state.projects?.isFetchingProjects,
      state.auth.authUser,
    ]
  );
  const [project, setProject] = useState<IProjectData | null>(null);

  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (!projectsList.length) dispatch(fetchProjectsData());
  }, [authUser]);

  useEffect(() => {
    const selectedProject = projectsList.find(
      (p: IProjectData) => p.id === params.id
    );
    setProject(selectedProject);
  }, [params.id, projectsList]);

  if (isFetchingProjects) {
    return (
      <div className="absolute top-1/2 left-1/2 ">
        <div
          className="w-12 h-12 rounded-full animate-spin
  border-4 border-solid border-darkBlue-101 border-t-transparent"
        ></div>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (project?.status) {
      case "pending":
        return "bg-gray-500";
      case "in_progress":
        return "bg-blue-400";
      case "done":
        return "bg-green-500";
      case "block":
        return "bg-red-500";
    }
  };

  return (
    <div className="px-5 pt-6">
      {project?.id && (
        <div>
          <div className="flex items-center">
            <h1 className="capitalize text-2xl font-semibold">
              {project.name}
            </h1>
            <span
              className={`ml-3 text-sm ${getStatusColor()} bg-opacity-60 px-2 py-0.5 rounded-md`}
            >
              {project.status}
            </span>
          </div>
          <h1 className="mt-3 font-medium">Project Requirements</h1>
          <p className="mt-2 text-gray-700">{project.requirements}</p>
          <h1 className="mt-4 font-medium">Time period</h1>
          <p className="mt-1 text-gray-700">
            {project.startDate} - {project.endDate}
          </p>
          <h1 className="mt-4 font-medium">Technology Stack</h1>
          <div className="container mt-1 mx-auto flex flex-row">
            <div className="flex justify-center items-center m-1 px-2 py-1 border border-gray-300 rounded-full bg-gray-200 text-base text-gray-700 font-medium">
              {project.technologyStack.map((t) => (
                <div className="flex-initial max-w-full leading-none text-xs font-normal">
                  {t}
                </div>
              ))}
            </div>
          </div>
          {authUser?.role === "mentor" && (
            <>
              <h1 className="mt-4 font-medium">Members</h1>
              <div className="container mt-1 mx-auto flex flex-row">
                <div className="flex justify-center items-center m-1 px-2 py-1 border border-gray-300 rounded-full bg-gray-200 text-base text-gray-700 font-medium">
                  {project.members.map((t) => (
                    <div className="flex-initial max-w-full leading-none text-xs font-normal">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <h1 className="mt-3 font-medium">Created By</h1>
          <p className="mt-2 text-gray-700">{project.createdBy}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
