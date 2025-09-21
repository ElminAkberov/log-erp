"use client";

import * as React from "react";
import {
  IconBuildingWarehouse,
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconListDetails,
  IconTruck,
  IconTruckDelivery,
  IconTruckLoading,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/ui/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconListDetails,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconBuildingWarehouse,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconTruckDelivery,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsers,
    },
    {
      title: "Shipments & Logistics",
      url: "/shipments",
      icon: IconTruckLoading,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconTruck className="!size-5" />
                <span className="text-base font-semibold ">166 Logistic</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center ">
        <UserButton afterSignOutUrl="/login" />
        <p className={`text-[14px]`}>{user?.fullName}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
