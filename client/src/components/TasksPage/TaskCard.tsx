import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import type { ITask } from "@/types";
import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";

const priorityStyles = {
  high: "border-l-4 border-red-500",
  medium: "border-l-4 border-yellow-400",
  low: "border-l-4 border-green-500",
};

export default function TaskCard(task: ITask) {
    const {
  title,
  description,
  status,
  priority,
  assignedTo,
  _id,
  dueDate
  
} = task
    const {openModal,} = useModal()
    const navigate = useNavigate()
    const {user} = useAuth()
  return (
    <div onClick={()=>{
        navigate("/tasks/"+_id)
    }}
      className={`relative cursor-pointer  transition border-t shadow-md ${priorityStyles[priority]}`}
    >
      {/* Actions */}
      <div className="absolute top-3 right-3  flex gap-1">
        <Button
          variant="outline" size="icon"
          onClick={(e)=>{ e.stopPropagation(); openModal("task",task)}}
        //   className="h-8 w-8"
        >
          <Pencil size={16} />
        </Button>
        <Button
         variant='destructive' size="icon"
          onClick={(e)=>{ e.stopPropagation(); openModal("delete",task)}}

        //   className="h-8 w-8 text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {/* Title + Status */}
        <div className="flex items-center gap-4 pr-12">
          <h3 className="text-base font-semibold truncate">{title}</h3>
        <StatusChip status={status} />

         
        </div>

        <p className="text-sm text-muted-foreground line-clamp-1">
          {description}
        </p>

        <div className="flex items-center gap-3 ">
            <p className="text-red-600 text-sm" >Due date:</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
          {format(dueDate, "PPP") }
        </p>
        </div>

        <PriorityChip priority={priority} />


        <div className="flex items-center gap-3 pt-2">
            <p className="text-muted-foreground text-sm" >Assigned to:</p>

          {
            assignedTo?.name?
            <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className=" bg-[#15023a] text-white text-sm " >
                {assignedTo?.name.slice(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{ assignedTo._id===user?._id?"You": assignedTo?.name}</span>
          </div>
          :
            <span className="text-sm">Not assigned</span>

          }
        </div>
      </div>
    </div>
  );
}
