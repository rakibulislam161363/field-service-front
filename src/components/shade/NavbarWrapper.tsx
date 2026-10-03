"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { User } from "@/src/types";
// import { User } from "@/lib/types";
// import Navbar from "./Navbar";



interface NavbarWrapperProps {
  user: User | null;
}

export default function NavbarWrapper({
  user,
}: NavbarWrapperProps) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" ||
    pathname === "/register";

  if (hideNavbar) {
    return null;
  }

  return <Navbar user={user} />;
}