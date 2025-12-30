import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ChevronRight, ListCheck, LogOut } from "lucide-react";
import api from "@/lib/axios";
import { cn, showErrMsg } from "@/lib/utils";
import { useState } from "react";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const isTasksPage = pathname==="/"
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = ()=>{
    setIsLoading(true)
    api.post('/auth/logout').then((res)=>{
        logout();
        navigate("/sign-in")

    }).catch(err=>{
        showErrMsg(err)
    }).finally(()=>{
    setIsLoading(false)

    })
  }

  return (
    <aside className="min-w-64 w-fit h-screen bg-gray-900 text-white p-4 flex flex-col">
        <div className="flex items-center gap-4 mb-12 ">
            <img src="/vite.svg" alt="logo" className=" " />
      <h1 className="text-3xl font-bold ">Task Manager</h1>

        </div>
      <div className="flex flex-col justify-between flex-1 ">
        <nav className="space-y-3">
          <Link to="/" 
          className={cn(" flex items-center gap-2 text-[16px] transition-all font-semibold hover:text-[#15023a]  hover:bg-gray-100 rounded-sm p-1", isTasksPage&&"bg-gray-100 text-[#15023a]")}>
            
            <ListCheck size={18} />
            <span>Tasks</span>
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger   className=" flex items-center gap-8 justify-between bg-[#fff] text-[#15023a] rounded-lg p-2 ">
            <div className=" flex items-center gap-2 ">
              <Avatar className=" text-[#15023a] font-semibold " >
                <AvatarFallback>
                  {user?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{user?.name}</p>
            </div>
            <ChevronRight size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex items-center gap-4 ">
              <Avatar className=" text-[#15023a] font-semibold " >

                  <AvatarFallback>
                    {user?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem  onClick={handleLogout} disabled={isLoading} >
              <LogOut />
              <span>{isLoading?"Logging out":'Logout'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
