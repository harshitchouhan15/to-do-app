import TaskCard from "@/components/TasksPage/TaskCard";
import TaskForm from "@/components/TasksPage/TaskForm";
import { ModalProvider } from "@/context/ModalContext";
import api from "@/lib/axios";
import { showErrMsg } from "@/lib/utils";
import type { ITask } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import TaskDeleteModal from "@/components/TasksPage/TaskDeleteModal";
import Loader from "@/components/Loader";

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null)



  const fetchTasks = () => {
    api
      .get(`/tasks`)
      .then((res) => {
        // console.log(res.data)
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        showErrMsg(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(()=>{
    fetchTasks()
  },[])

  return (
    <ModalProvider>
      <div ref={ref} className="flex flex-col min-h-screen ">
        <div className="flex top-0 pt-6 sticky z-10 pb-2 bg-gray-100 items-center justify-between ">
          <h1 className=" text-2xl ">Manage tasks here</h1>
          <TaskForm fetchTasks={fetchTasks} />
        </div>
        <TaskDeleteModal fetchTasks={fetchTasks} />

        {
          isLoading?
          <Loader/>
          :
          <div  className="flex flex-1 justify-between pb-6 flex-col">
          <div className="flex flex-col gap-3 w-[60%] mx-auto py-8 ">
            {tasks.map((task) => (
              <TaskCard key={task._id} {...task} />
            ))}
          </div>

          {/* Next */}
        
        </div>
        }
      </div>
    </ModalProvider>
  );
};

export default TasksPage;
