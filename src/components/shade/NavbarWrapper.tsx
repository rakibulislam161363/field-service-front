"use client";

import { usePathname } from "next/navigation";
import Navbar, { DashboardSidebar, type DashboardRole } from "./navbar";
import { useGetMe } from "@/src/hooks";
import type { GetMeResponse, User } from "@/src/types";

interface NavbarWrapperProps {
  children: React.ReactNode;
}

type NavbarUser = Pick<User, "name" | "email" | "role">;

function getNavbarUser(response: GetMeResponse | undefined): NavbarUser | null {
  const profile = response?.data;

  if (!profile) {
    return null;
  }

  return {
    name: profile.name,
    email: profile.email,
    role: profile.role,
  };
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";
  const { data, isLoading } = useGetMe({ enabled: !hideNavbar });
  const user = getNavbarUser(data);
  const dashboardRole: DashboardRole | null = pathname.startsWith("/dashboard")
    ? "CUSTOMER"
    : pathname.startsWith("/technician")
      ? "TECHNICIAN"
      : pathname.startsWith("/admin")
        ? "ADMIN"
        : null;

  if (hideNavbar) {
    return <>{children}</>;
  }

  if (dashboardRole) {
    return (
      <>
        <Navbar dashboardRole={dashboardRole} user={user} isLoading={isLoading} />
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <DashboardSidebar role={dashboardRole} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar user={user} isLoading={isLoading} />
      <div className="flex-1">{children}</div>
    </>
  );
}