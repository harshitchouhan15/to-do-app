import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "./PasswordInput";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showErrMsg } from "@/lib/utils";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 2) return alert("Name must be atleast 2 letters long");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return alert(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. Harshit123@)."
      );
    }

    setIsLoading(true);

    try {
      const { data } = await api.post("/auth/register", {
        email,
        password,
        name,
      });
      login(data);
      navigate("/");
    } catch (error:any) {
      showErrMsg(error)

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isLoading} className="w-full  font-bold">
        Create Account
      </Button>
    </form>
  );
}
