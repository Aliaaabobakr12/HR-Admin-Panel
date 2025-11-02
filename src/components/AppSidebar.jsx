import { Building2, LayoutDashboard, MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useUserStore } from "../store/useUserStore";
import { Button } from "./ui/button";
import { getAvatarDoubleCharacters } from "../lib/utils";
import { signOut } from "../firebase/controllers/firebaseUsers";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const user = useUserStore((state) => state.currentUser);
  const navigate = useNavigate();

  const isActive = (url) => pathname.startsWith(url);

  const handleOnLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 w-full border-b lg:hidden">
          <Building2 size={30} />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:text-primary ${
                      isActive(item.url)
                        ? "bg-gray-100 text-primary hover:bg-gray-100"
                        : ""
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon
                        className={isActive(item.url) ? "text-primary" : ""}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center">
          <Avatar>
            <AvatarFallback>
              {getAvatarDoubleCharacters(user.fullName)}
            </AvatarFallback>
          </Avatar>{" "}
          <Button onClick={handleOnLogout} variant={"link"}>
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
