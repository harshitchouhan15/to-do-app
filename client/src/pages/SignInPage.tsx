import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import SignInForm from "@/components/SignInPage/SignInForm";
import SignUpForm from "@/components/SignInPage/SignUpForm";

export default function SignInPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { login } = useAuth();




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {isSignIn ? (
          <SignInForm  />
        ) : (
          <SignUpForm  />
        )}

        <p className="text-sm text-center mt-4">
          {isSignIn ? "No account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 font-medium"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
