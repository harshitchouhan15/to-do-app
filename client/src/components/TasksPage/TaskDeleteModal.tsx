import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button';
import { useModal } from '@/context/ModalContext';
import api from '@/lib/axios';
import { showErrMsg } from '@/lib/utils';
import { toast } from 'react-toastify';


const TaskDeleteModal = ({fetchTasks}:{
    fetchTasks: () => void

}) => {
    const {modalType, data, openModal, closeModal} = useModal()
    const [isPending, setIsPending] = useState(false)

    const deleteTask = ()=>{
        if(!data?._id) return;
        setIsPending(true)
        api.delete(`/tasks/${data?._id}`).then(res=>{
            closeModal();
            fetchTasks();
            toast.success("Task deleted")


        }).catch(showErrMsg).finally(()=>{
        setIsPending(false)
        })

    }
    


 
  
    return (
      <Dialog
        open={modalType==='delete'}
        onOpenChange={(open) => {
          if (!open){
            closeModal()
          }
        }}
      >
        <DialogContent className="w-[36vw] h-[40vh]">
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <h2 className='text-center' >Are you sure you want to delete the task "{data?.title}"?</h2>
            <div className="flex items-center justify-center gap-4">
              <Button
              variant={'secondary'}
                onClick={() => {
                    closeModal()
                }}
                className='cursor-pointer'

              >
                Cancel
              </Button>
  
              <Button
                variant={"destructive"}
                className='cursor-pointer'
                onClick={deleteTask}
                disabled={isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  

export default TaskDeleteModal;


  
  