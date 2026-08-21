
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface UserDashboardSidebarProps {
  userName: string;
  handleLogout: () => Promise<void>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserDashboardSidebar: React.FC<UserDashboardSidebarProps> = ({ 
  userName, 
  handleLogout, 
  activeTab,
  setActiveTab 
}) => {
  const sidebarItems = [
    { label: "Dashboard", onClick: () => setActiveTab("dashboard") },
    { label: "Member Benefits", onClick: () => setActiveTab("member-benefits") },
    { label: "Make Documents", onClick: () => setActiveTab("documents") },
    { label: "Start Business", onClick: () => setActiveTab("business") },
    { label: "Ask Legal Advice", onClick: () => setActiveTab("legal-advice") },
    { label: "Profile", onClick: () => setActiveTab("profile") },
    { label: "Payment", onClick: () => setActiveTab("payment") },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="text-base font-medium">{userName}</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={item.onClick}
                isActive={activeTab === item.label.toLowerCase()}
                className="h-11 w-full justify-start px-4 hover:bg-muted"
              >
                <span className="text-base">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start hover:bg-destructive/10 text-destructive hover:text-destructive"
        >
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserDashboardSidebar;
