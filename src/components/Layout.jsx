import React from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col lg:w-[calc(100%-200px)] w-full">
          <Header />
          <div className="p-4 bg-gray-100 h-full">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
