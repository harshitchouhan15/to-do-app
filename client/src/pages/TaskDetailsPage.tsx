import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CalendarDays, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ITask } from "@/types";
import api from "@/lib/axios";
import { showErrMsg } from "@/lib/utils";
import { format } from "date-fns";
import StatusChip from "@/components/TasksPage/StatusChip";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

type Task = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  assignee: {
    name: string;
  };
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

const priorityStyles = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};

export default function TaskDetailsPage() {
  const {pathname} = useLocation()
  const taskId = pathname.split("/")[2]
  const {user} = useAuth()

  const [task, setTask] = useState<ITask|null>(null)
  const [isLoading, setIsLoading] = useState(true)
 

  useEffect(()=>{
    api.get("/tasks/"+taskId).then((res)=>setTask(res.data)).catch(showErrMsg).finally(()=>{setIsLoading(false)})
  },[])

  if(isLoading) return <Loader/>

  if(!task) return <p>Task not found!</p>

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex items-center gap-3 mt-2">
          <StatusChip status={task.status} />
            <span
              className={`text-sm font-medium ${priorityStyles[task.priority]}`}
            >
              {task.priority.toUpperCase()} PRIORITY
            </span>
          </div>
        </div>

    
      </div>

      <hr />

      {/* Main Content */}
      <div className="flex justify-between gap-6">
        {/* Description */}
        <div className=" p-5 space-y-3 flex-1 ">
          <h3 className="font-semibold text-lg">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="p-5 space-y-4">
          <h3 className="font-semibold text-lg">Details</h3>

          {/* Assignee */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 ">
            <User size={16} className="text-muted-foreground" />
              <span className="text-sm" >Assigned to:</span>

            </div>
             {
              task.assignedTo?
              <div className=" flex items-center gap-1 " >
              
               <Avatar className="h-8 w-8">
              <AvatarFallback className=" bg-[#15023a] text-white " >
                {task.assignedTo?.name.slice(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{ task.assignedTo._id=== user?._id?"You": task.assignedTo?.name}</span>
            </div>
            :
            <p>Not assigned</p>
             }
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={16} className="text-muted-foreground" />
              <span>Due:  {"   "} {format(task.dueDate, "PPP") }</span>
            </div>
          )}

          <hr />

          <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 ">
            <User size={16} className="text-muted-foreground" />
              <span className="text-sm" >Created by:</span>

            </div>
            
              <div className=" flex items-center gap-1 " >
              
               <Avatar className="h-8 w-8">
              <AvatarFallback className=" bg-[#25a408] text-[16px] text-white " >
                {task.createdBy?.name.slice(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{ task.createdBy?._id===user?._id?"You": task.createdBy?.name}</span>
            </div>
            
             
          </div>
            <p>Created: {format(task.createdAt, "PPP") }</p>
            <p>Last updated: {format(task.updatedAt, "PPP") }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
