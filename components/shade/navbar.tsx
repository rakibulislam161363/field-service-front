"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LoaderCircle,
  Plus,
  Tags,
  UserRound,
  UsersRound,
  WalletCards,
  Wrench,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/shade/ThemeToggle";
import type { User } from "@/src/types";

export type DashboardRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  dashboardRole?: DashboardRole;
  user?: Pick<User, "name" | "email" | "role"> | null;
  isLoading?: boolean;
}

const dashboardPaths: Record<DashboardRole, string> = {
  CUSTOMER: "/dashboard",
  TECHNICIAN: "/technician",
  ADMIN: "/admin",
};

const profilePaths: Partial<Record<DashboardRole, string>> = {
  CUSTOMER: "/dashboard/profile",
  TECHNICIAN: "/technician/profile",
};

const roleLabels: Record<DashboardRole, string> = {
  CUSTOMER: "Customer",
  TECHNICIAN: "Technician",
  ADMIN: "Administrator",
};

export default function Navbar({ dashboardRole, user = null, isLoading = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = Boolean(dashboardRole);
  const role = dashboardRole ?? user?.role ?? "CUSTOMER";
  const profilePath = profilePaths[role];
  const accountName = user?.name ?? `${roleLabels[role]} account`;
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : role.slice(0, 2);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-bold tracking-tight">
              FixIt<span className="text-primary">Now</span>
            </span>
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              On-demand Field Service
            </span>
          </span>
        </Link>

        {!isDashboard && (
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {isDashboard ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Notifications"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Bell className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <p className="px-3 py-2 text-sm font-semibold">Notifications</p>
                  <DropdownMenuSeparator />
                  <p className="px-3 py-5 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </p>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md p-1.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {initials}
                  </span>
                  <span className="hidden max-w-36 truncate text-sm font-medium sm:block">
                    {accountName}
                  </span>
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold">{accountName}</p>
                    {user?.email && (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                    <p className="mt-1 text-xs font-medium uppercase text-primary">
                      {roleLabels[role]}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {profilePath && (
                    <DropdownMenuItem onClick={() => router.push(profilePath)}>
                      Profile
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push(dashboardPaths[role])}>
                    Dashboard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md p-1.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {initials}
                </span>
                <span className="hidden max-w-36 truncate text-sm font-medium sm:block">
                  {user.name}
                </span>
                <UserRound className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  <p className="mt-1 text-xs font-medium uppercase text-primary">
                    {roleLabels[user.role]}
                  </p>
                </div>
                <DropdownMenuSeparator />
                {profilePaths[user.role] && (
                  <DropdownMenuItem onClick={() => router.push(profilePaths[user.role]!)}>
                    Profile
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push(dashboardPaths[user.role])}>
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isLoading ? (
            <span className="flex h-9 w-9 items-center justify-center" aria-label="Loading account">
              <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
            </span>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}

          {!isDashboard && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {!isDashboard && menuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${
                  isActive(item.href) ? "bg-muted text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 space-y-2 border-t pt-3">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  <p className="mt-1 text-xs font-medium uppercase text-primary">
                    {roleLabels[user.role]}
                  </p>
                </div>
                <Link href={dashboardPaths[user.role]} onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2 border-t pt-3">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

interface DashboardSidebarProps {
  role: DashboardRole;
}

const sidebarItems: Record<DashboardRole, { label: string; href: string; icon: typeof LayoutDashboard }[]> = {
  CUSTOMER: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My requests", href: "/dashboard/requests", icon: ClipboardList },
    { label: "New request", href: "/dashboard/requests/create", icon: Plus },
    { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  ],
  TECHNICIAN: [
    { label: "Overview", href: "/technician", icon: LayoutDashboard },
    { label: "Jobs", href: "/technician/jobs", icon: BriefcaseBusiness },
    { label: "Earnings", href: "/technician/earnings", icon: WalletCards },
  ],
  ADMIN: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Requests", href: "/admin/requests", icon: ClipboardList },
    { label: "Technicians", href: "/admin/technicians", icon: UsersRound },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Reports", href: "/admin/reports", icon: ChartNoAxesCombined },
  ],
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = sidebarItems[role];
  const activeHref =
    items
      .filter(
        (item) =>
          pathname === item.href ||
          (item.href !== dashboardPaths[role] && pathname.startsWith(`${item.href}/`)),
      )
      .sort((first, second) => second.href.length - first.href.length)[0]?.href ??
    dashboardPaths[role];

  const renderLinks = () =>
    items.map((item) => {
      const Icon = item.icon;
      const active = activeHref === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
            active ? "bg-muted text-foreground" : "text-muted-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          {item.label}
        </Link>
      );
    });

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r bg-background md:block">
        <div className="sticky top-16 min-h-[calc(100vh-4rem)] px-3 py-6">
          <p className="px-3 pb-3 text-xs font-semibold uppercase text-muted-foreground">
            {roleLabels[role]} workspace
          </p>
          <nav className="flex flex-col gap-1" aria-label={`${roleLabels[role]} navigation`}>
            {renderLinks()}
          </nav>
        </div>
      </aside>
      <nav className="w-full overflow-x-auto border-b bg-background md:hidden" aria-label={`${roleLabels[role]} navigation`}>
        <div className="flex min-w-max gap-1 px-3 py-2">{renderLinks()}</div>
      </nav>
    </>
  );
}