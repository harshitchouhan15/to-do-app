import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "./PasswordInput";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showErrMsg } from "@/lib/utils";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
   const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


      setIsLoading(true)

    api.post("/auth/login",{email, password}).then((res)=>{
 login(res.data);
      navigate("/");
    }).catch((err)=>{
      showErrMsg(err)

    }).finally(()=>{
      setIsLoading(false)
    })
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <PasswordInput value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isLoading} type="submit" className="w-full  font-bold">Sign In</Button>
    </form>
  );
}
