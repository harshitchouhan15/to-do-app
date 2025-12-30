import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder="Password"
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        className="pr-10"
      />

      <div
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 cursor-pointer bg-transparent top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </div>
    </div>
  );
}
