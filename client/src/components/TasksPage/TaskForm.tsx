import React, { useEffect } from 'react'

import { useState } from "react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { useModal } from '@/context/ModalContext';
import type { ITask } from '@/types';
import api from '@/lib/axios';
import { showErrMsg } from '@/lib/utils';
import { toast } from 'react-toastify';
import AssignUserPopover from './AssignUserPopover';

export default function TaskForm({fetchTasks}:{
   fetchTasks: () => void
}) {
  const {modalType, openModal, closeModal, data} = useModal()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState<Date | undefined>();
    const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = React.useState("")

  const [users, setUsers] = useState([])

  useEffect(()=>{
    api.get("/tasks/users/all").then((res)=>setUsers(res.data)).catch(err=>{})

  },[])



    const isEdit = Boolean(data)

    useEffect(()=>{
        if(modalType==='task'&&data){
             setTitle(data?.title)
            setDescription(data.description)
            setDueDate(new Date(data.dueDate))
            setPriority(data.priority)
            setStatus(data.status)
           data.assignedTo?._id&& setValue(data.assignedTo._id)
        }

    },[data, modalType])
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!dueDate) return toast.warning('Due date is required!')

    const payload = {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo:value||null
    };



    
    setIsLoading(true)

    const url = isEdit?`/tasks/${data?._id}`:"/tasks";
    const method = isEdit?`put`:"post";

    api[method](url,payload).then((res)=>{
        fetchTasks()
    closeModal();
    resetForm()

    if(isEdit){
        toast.success("Task updated")
    }else{
        toast.success("Task created")

    }




    }).catch(err=>{
        showErrMsg(err)
    }).finally(()=>{
    setIsLoading(false)

    })

  };

  const resetForm= ()=>{
            setTitle("")
            setDescription('')
            setDueDate(undefined)
            setPriority("medium")
            setStatus('todo')
            setValue('')
  }

  return (
    <Dialog open={modalType==="task"} onOpenChange={(open)=>{
        // console.log("first")
        if(!open){
           resetForm()
            closeModal()
        }else{
            openModal("task",)
        }
    }}>
      <DialogTrigger className=' ' asChild>
        <Button  >
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit?"Update":"Create New"} Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium block">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className=" justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                //   initialFocus
                autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

           <div>
            <label className="text-sm font-medium block">Add assignee</label>
            <AssignUserPopover users={users} setValue={setValue} value={value} />
           
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {closeModal();resetForm()}}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">{isEdit?"Update":"Create"} Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

