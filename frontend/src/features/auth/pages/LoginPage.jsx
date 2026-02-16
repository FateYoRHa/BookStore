import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema.js";
import { useLogin } from "../hooks/useLogin.js";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";

export default function LoginPage() {
  // Custom hook for login logic
  const { mutate, isPending } = useLogin();

  // React Hook Form setup
  const {
    register, // connects inputs
    handleSubmit, // handles form submission
    formState: { errors }, // contains validation errors
  } = useForm({
    resolver: zodResolver(loginSchema), // connects Zod validation
  });

  const onSubmit = (data) => {
    mutate(data); // triggers loginRequest through React Query
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
