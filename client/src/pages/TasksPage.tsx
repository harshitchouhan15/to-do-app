import TaskCard from "@/components/TasksPage/TaskCard";
import TaskForm from "@/components/TasksPage/TaskForm";
import { ModalProvider } from "@/context/ModalContext";
import api from "@/lib/axios";
import { showErrMsg } from "@/lib/utils";
import type { ITask } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import TaskDeleteModal from "@/components/TasksPage/TaskDeleteModal";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const ref = useRef<HTMLDivElement>(null)

  const [page, setPage] = useState(1);

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth", block:'start'  })
    
    fetchTasks();
  }, [page]);

  const fetchTasks = () => {
    api
      .get(`/tasks?page=${page}&limit=${4}`)
      .then((res) => {
        // console.log(res.data)
        setTasks(res.data.tasks);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        showErrMsg(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
          <Pagination
            onPageChange={setPage}
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
        }
      </div>
    </ModalProvider>
  );
};

export default TasksPage;
