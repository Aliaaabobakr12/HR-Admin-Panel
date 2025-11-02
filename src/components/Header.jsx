import { Building2, Menu } from "lucide-react";
import React from "react";
import { useSidebar } from "./ui/sidebar";

export default function Header() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="flex items-center justify-between h-12 w-full px-4 border-b">
      <Menu onClick={() => setOpenMobile(true)} className="lg:hidden" />
      <Building2 className="hidden lg:flex" />
      <h1> HR Admin Panel</h1>
      <div className="hidden lg:flex items-center" />
    </div>
  );
}
