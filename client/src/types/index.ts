
type IUser = {
  name: string;
  email: string;
  _id:string;
  createdAt:string;
  updatedAt:string;
};


type ITask = {
title: string;
_id:string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  
  assignedTo:{
    name:string;
    _id:string;
  }|null;
  
    createdBy:{
    name:string;
    _id:string;
  };
  dueDate:string;
  createdAt:string;
  updatedAt:string;

}

export type {ITask, IUser}