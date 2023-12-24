"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

import { Metadata } from "next"
import Image from "next/image"

import { SidebarNav } from "./sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
      title: "Items",
      href: "/dashboard/items",
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ]

  interface SettingsLayoutProps {
    children: React.ReactNode
  }

export const Sidebar = () => {
  return (
    <>
    <div className="flex-row space-x-12 space-y-0">
        <SidebarNav items={sidebarNavItems} />
    </div>
    </>
  );
};