import type { Roles } from "~/types/globals";
import { useAuth } from "@clerk/nextjs";

export const useCheckRole = (role: Roles) => {
  const { orgRole } = useAuth();

  console.log(orgRole, "test");

  return orgRole === role;
};
