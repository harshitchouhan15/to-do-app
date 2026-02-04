import React, { useEffect } from "react";

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
import { useModal } from "@/context/ModalContext";
import type { ITask } from "@/types";
import api from "@/lib/axios";
import { showErrMsg } from "@/lib/utils";
import { toast } from "react-toastify";
import AssignUserPopover from "./AssignUserPopover";

export default function TaskForm({ fetchTasks }: { fetchTasks: () => void }) {
  const { modalType, openModal, closeModal, data } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState("");



  const isEdit = Boolean(data);

  useEffect(() => {
    if (modalType === "task" && data) {
      setTitle(data?.title);
      setDescription(data.description);
      setStatus(data.status);
    }
  }, [data, modalType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const payload = {
      title,
      description,
      status,
    };

    setIsLoading(true);

    const url = isEdit ? `/tasks/${data?._id}` : "/tasks";
    const method = isEdit ? `put` : "post";

    api[method](url, payload)
      .then((res) => {
        fetchTasks();
        closeModal();
        resetForm();

        if (isEdit) {
          toast.success("Task updated");
        } else {
          toast.success("Task created");
        }
      })
      .catch((err) => {
        showErrMsg(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(undefined);
    setStatus("todo");
    setValue("");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog
      open={modalType === "task"}
      onOpenChange={(open) => {
        // console.log("first")
        if (!open) {
          resetForm();
          closeModal();
        } else {
          openModal("task");
        }
      }}
    >
      <DialogTrigger className=" " asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[96vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create New"} Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Task description"
              value={description}
              // rows={5}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>





          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                closeModal();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              {isEdit ? "Update" : "Create"} Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
