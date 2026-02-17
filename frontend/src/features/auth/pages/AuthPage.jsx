import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";

import { loginSchema } from "../schema.js";
import { useLogin } from "../hooks/useLogin.js";

import LoginForm from "./forms/LoginForm.jsx";
import SignupForm from "./forms/SignupForm.jsx";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl h-[600px] overflow-hidden rounded-2xl shadow-2xl">
        {/* SLIDING WRAPPER */}
        <motion.div
          className="flex w-[200%] h-full"
          animate={{
            x: isLogin ? "0%" : "-50%",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}>
          {/* LOGIN PANEL */}
          <div className="w-1/2 flex">
            {/* Login Form Section */}
            <div className="w-1/2 flex items-center justify-center p-10">
              <LoginForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isPending={isPending}
                className="w-full max-w-4xl"
              />
            </div>

            {/* Login Image Section */}
            <div className="w-1/2 bg-primary text-primary-foreground flex flex-col items-center justify-center p-10">
              <img src="/auth-image.jpg" alt="Login" className="w-64 mb-6" />

              <h2 className="text-2xl font-bold mb-4">New Here?</h2>
              <p className="text-center mb-6 opacity-80">
                "Create an account and start your reading journey."
              </p>
              <Button variant="secondary" onClick={() => setIsLogin(false)}>
                Sign Up
              </Button>
            </div>
          </div>

          {/* REGISTER PANEL */}
          <div className="w-1/2 flex">
            {/* Register Image Section */}
            <div className="w-1/2 bg-accent text-primary-foreground flex flex-col items-center justify-center p-8">
              <img src="/auth-image.jpg" alt="Register" className="w-64 mb-6" />

              <h2 className="text-2xl font-bold mb-4">
                Already have an account?
              </h2>
              <p className="text-center mb-6 opacity-80">
                "Login and continue exploring amazing books."
              </p>
              <Button variant="secondary" onClick={() => setIsLogin(true)}>
                Login
              </Button>
            </div>

            {/* Register Form Section */}
            <div className="w-1/2 flex items-center justify-center p-8">
              <SignupForm />
            </div>
          </div>
        </motion.div>
      </div>
      {/* <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isPending={isPending}
        className="w-full max-w-4xl"
      /> */}
    </div>
  );
}
