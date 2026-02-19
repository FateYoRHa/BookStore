import { useLogout } from "../../hooks/auth_hooks.js";
export const Logout = () => {
  const { mutate, isPending } = useLogout();
  const handleLogout = () => {
    if (isPending) return;
    mutate();
  };
  return (
    <button onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};
