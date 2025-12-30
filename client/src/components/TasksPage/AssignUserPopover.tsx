import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { IUser } from "@/types"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { useAuth } from "@/context/AuthContext"

const AssignUserPopover = ({setValue, value, users}:{
    setValue: React.Dispatch<React.SetStateAction<string>>
    value:string
    users:IUser[]
}) => {
    const [open, setOpen] = React.useState(false)
    const {user} = useAuth()
    const selectedUser = users.find((user)=>user._id===value);

  return (
     <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value&&selectedUser
            ? 
            <div className=" flex items-center gap-2 ">
              <Avatar className=" text-[#15023a] font-semibold " >
                <AvatarFallback>
                  {selectedUser?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{selectedUser._id===user?._id?"You":selectedUser?.name}</p>
            </div>
            : "Select user"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((framework) => (
                <CommandItem
                  key={framework._id}
                  value={framework.name}
                  onSelect={() => {
                    setValue(framework._id === value ? "" : framework._id)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className=" flex items-center gap-2 ">
              <Avatar className=" text-[#15023a] font-semibold " >
                <AvatarFallback className=" text-white bg-[#15023a] " >
                  {framework?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{framework._id===user?._id?"You":framework?.name}</p>
            </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AssignUserPopover





const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]