
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
  status:  "pending" | "completed";
  

  
    createdBy:{
    name:string;
    _id:string;
  };
  createdAt:string;
  updatedAt:string;

}

export type {ITask, IUser}