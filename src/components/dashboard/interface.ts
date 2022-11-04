export interface ITechnology {
  id?: string;
  name: string;
  image: string;
  resources: Array<{ value: string }>;
  status: string;
}

export interface IProjectData {
  name: string;
  requirements: string;
  startDate: string;
  endDate: string;
  members: string[];
  technologyStack: string[];
  status: string;
  createdBy?:string
  id?:string
}

export interface IAuthUser {
  email: string;
  role: string;
  uid: string;
  id: string;
}
