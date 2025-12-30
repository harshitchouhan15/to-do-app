import type { ITask } from '@/types';
import React, { createContext, useContext, useState } from 'react'

type ModalType = "task"|"delete";


type ModalContextType = {
 modalType?:ModalType
 data?:ITask;
 openModal: (modalType: ModalType, data?: ITask) => void
 closeModal:()=>void;

};


const ModalContext = createContext<ModalContextType>({modalType:undefined,data:undefined, openModal() {
    
},closeModal() {
    
},})


export const ModalProvider = ({children}:{children:React.ReactNode}) => {
    const [modalType, setModalType] = useState<ModalType|undefined>();
    const [data, setData] = useState<ITask>();

    const openModal = (modalType:ModalType,data?:ITask)=>{
        setModalType(modalType);
        setData(data)
    }

    const closeModal = ()=>{
        setModalType(undefined);
        setData(undefined)
    };

  return (
    <ModalContext.Provider value={{modalType,closeModal, openModal, data}} >
        {children}
    </ModalContext.Provider>
  )
}

export const useModal = ()=> useContext(ModalContext)