
import React from "react";
import { cn } from "@/lib/utils";
import { FileText, Home, PlayCircle, Code, File, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Documentation",
    href: "/documentation",
    icon: FileText,
  },
  {
    title: "API Reference",
    href: "/api-reference",
    icon: File,
  },
  {
    title: "Simulators",
    href: "/simulators",
    icon: PlayCircle,
  },
  {
    title: "Certification Checklist",
    href: "/certification",
    icon: CheckSquare,
  },
];

export function SidebarNav() {
  const location = useLocation();
  
  return (
    <div className="w-full">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center py-2 px-3 text-sm font-medium rounded-md",
              location.pathname === item.href
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
