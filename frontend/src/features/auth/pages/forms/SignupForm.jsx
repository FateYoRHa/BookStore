import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../../schema.js";
import { useSignup } from "../../hooks/auth_hooks.js";

import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormFieldError from "@/components/forms/FormFieldError";
import toast from "react-hot-toast";
export default function SignupForm({ className, ...props }) {
  const { mutate, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  watch("password");

  const onSubmit = (data) => {
    mutate(data, {
      onError: (error) => {
        if (error.response) {
          // Server responded with error
          const message = error.response?.data?.message || "Internal Server Error";
        
          // This connects backend error to the form
          setError("email", {
            type: "server",
            message: message,
          });
        } else if (error.request) {
          // Request made but no response
          toast.error("Server not responding");
        } else {
          // Something else
          toast.error("Unexpected error occurred");
        }
      },
    });
  }
  return (
    <div
      className={cn("flex flex-col gap-6 bg-primary-foreground", className)}
      {...props}>
      {/* FORM START */}
      <form
        onSubmit={handleSubmit(onSubmit)} // ← passed from parent
        className="p-6 md:p-8">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to create your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="m@example.com"
              className={cn(
                errors?.email &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError
              error={errors.email}
              helper="We'll use this to contact you. We will not share your email with anyone else."
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...register("password")}
              type="password"
              className={cn(
                errors?.password && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError
              error={errors.password}
              helper="Must be at least 8 characters, include uppercase, lowercase, and special character."
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              {...register("confirmPassword")}
              type="password"
              className={cn(
                errors?.confirmPassword &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError
              error={errors.confirmPassword}
              helper="Please confirm your password."
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Signing up..." : "Create Account"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
