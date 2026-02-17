import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema.js";
import { useLogin } from "../hooks/useLogin.js";

import LoginForm from "./forms/LoginForm.jsx";

export default function LoginPage() {
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
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isPending={isPending}
        className="w-full max-w-4xl"
      />
    </div>
  );
}
