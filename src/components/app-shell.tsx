import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  NotebookText,
  CalendarDays,
  Compass,
  Gauge,
  MessagesSquare,
  CalendarClock,
  FolderOpen,
  Activity,
  LineChart,
  AlertTriangle,
  FileText,
  Shield,
  Calculator,
  HeartHandshake,
  Navigation,
  Building,
  TrendingUp,
  Package,
  Grid2X2,
  MoreHorizontal,
  Star,
  User,
  Settings,
  Wallet,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Droplet,
  Timer,
  Briefcase,
  Target,
  BookOpen,
  Bookmark,
  Lightbulb,
  Key,
  Dumbbell,
  Utensils,
  Music,
  CloudSun,
  Book,
  Plane,
  ShoppingCart,
  Heart,
  HeartPulse,
  Archive,
  GraduationCap,
  Layers,
  FileCheck,
  Globe,
  Film,
  Gamepad2,
  Podcast,
  Ticket,
  PenTool,
  Camera,
  Type,
  Code,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Building2,
  Sprout,
  Search,
  Bell,
  Coins,
  MessageCircle,
  Truck,
  Store,
  Home,
  ScrollText,
  Binary,
} from "lucide-react";
import { useLanguage } from "@/finance/hooks/useLanguage";
import type { ReactNode } from "react";
import { ProfileSwitch } from "@/components/profile-switch";

import { ThemeLangToggle } from "@/components/theme-lang-toggle";
import { ProfileMenu, SettingsModal } from "./wira-settings";
import { useMenuSettings } from "@/hooks/useMenuSettings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export const navKonsultan = [
  {
    title: "Manajemen Utama",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/klien", label: "Klien", icon: Users },
      { to: "/contacts", label: "CRM", icon: Users },
      { to: "/proyek", label: "Proyek", icon: FolderKanban },
      { to: "/tugas", label: "Tugas", icon: CheckSquare },
      { to: "/tasks-calendar", label: "Tasks Calendar", icon: CalendarClock },
      { to: "/catatan", label: "Catatan", icon: NotebookText },
      { to: "/kalender", label: "Timeline", icon: CalendarDays },
      { to: "/countdown", label: "Countdown", icon: Timer },
      { to: "/katalog-produk", label: "Katalog Produk", icon: Package },
    ],
  },
  {
    title: "Overview",
    items: [
      { to: "/insight", label: "Insight", icon: Lightbulb },
      { to: "/outlook", label: "Outlook", icon: TrendingUp },
    ],
  },
  {
    title: "Asset",
    items: [
      { to: "/asset", label: "Kuadran Aset", icon: Briefcase },
      { to: "/liquid-reserves", label: "Liquid Reserves", icon: Coins },
      { to: "/physical-commodities", label: "Physical Commodities", icon: Package },
      { to: "/real-estate", label: "Real Estate", icon: Home },
      { to: "/paper-securities", label: "Paper Securities", icon: ScrollText },
      { to: "/digital-assets", label: "Digital Assets", icon: Binary },
      { to: "/intellectual-property", label: "Intellectual Property", icon: Lightbulb },
    ],
  },
  {
    title: "Liability",
    items: [{ to: "/liability", label: "Kuadran Liabilitas", icon: CreditCard }],
  },
  {
    title: "Earning",
    items: [{ to: "/earning", label: "Kuadran Pendapatan", icon: DollarSign }],
  },
  {
    title: "Expense",
    items: [{ to: "/expense", label: "Kuadran Pengeluaran", icon: ShoppingCart }],
  },
  {
    title: "5 Tahap Keuangan",
    items: [
      { to: "/surety", label: "Tahap 1: Surety", icon: ShieldCheck },
      { to: "/flow", label: "Tahap 2: Flow", icon: RefreshCw },
      { to: "/build", label: "Tahap 3: Build", icon: Building2 },
      { to: "/grow", label: "Tahap 4: Grow", icon: Sprout },
      { to: "/legacy", label: "Tahap 5: Legacy", icon: BookOpen },
    ],
  },
  {
    title: "Value Treated",
    items: [
      { to: "/kurasi/ekonomi", label: "Ekonomi", icon: Coins },
      { to: "/kurasi/statistik", label: "Statistik", icon: LineChart },
      { to: "/kurasi/manajemen", label: "Manajemen", icon: Briefcase },
      { to: "/kurasi/komunikasi", label: "Komunikasi", icon: MessageCircle },
      { to: "/kurasi/logistik", label: "Logistik", icon: Truck },
      { to: "/kurasi/bisnis", label: "Bisnis", icon: Store },
      { to: "/kurasi/administrasi", label: "Administrasi", icon: FileText },
      { to: "/kurasi/akuntansi", label: "Akuntansi", icon: Calculator },
      { to: "/kurasi/asuransi", label: "Asuransi", icon: Shield },
      { to: "/kurasi/investasi", label: "Investasi", icon: TrendingUp },
      { to: "/swot", label: "SWOT Analysis", icon: Target },
    ],
  },
  {
    title: "Keuangan & Investasi",
    items: [
      { to: "/finances", label: "Finances", icon: DollarSign },
      { to: "/budget", label: "Budget", icon: Wallet },
      { to: "/kredit", label: "Kredit & Utang", icon: CreditCard },
      { to: "/subscriptions", label: "Subscriptions", icon: CreditCard },
      { to: "/pajak", label: "Kalkulator Pajak", icon: Calculator },
      { to: "/investasi", label: "Kalkulator Investasi", icon: TrendingUp },
      { to: "/valuasi", label: "Valuasi MAPPI", icon: Building },
      { to: "/financial-health", label: "Kesehatan Finansial", icon: HeartPulse },
    ],
  },
  {
    title: "Organisasi Pribadi",
    items: [
      { to: "/goals", label: "Goals", icon: Target },
      { to: "/habits", label: "Habits", icon: Activity },
      { to: "/journal", label: "Journal", icon: BookOpen },
      { to: "/notes", label: "Notes & Docs", icon: FileText },
      { to: "/ideas", label: "Ideas", icon: Lightbulb },
      { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
      { to: "/passwords", label: "Passwords", icon: Key },
      { to: "/inventory", label: "Inventory", icon: Archive },
      { to: "/proyek-personal", label: "Personal Projects", icon: Briefcase },
    ],
  },
  {
    title: "Pendidikan & Belajar",
    items: [
      { to: "/courses", label: "Courses", icon: GraduationCap },
      { to: "/flashcards", label: "Flashcards", icon: Layers },
      { to: "/exams", label: "Exams", icon: FileCheck },
      { to: "/languages", label: "Languages", icon: Globe },
      { to: "/reading", label: "Reading List", icon: Book },
    ],
  },
  {
    title: "Kesehatan & Gaya Hidup",
    items: [
      { to: "/health", label: "Health", icon: Heart },
      { to: "/workouts", label: "Workouts", icon: Dumbbell },
      { to: "/water", label: "Water Tracker", icon: Droplet },
      { to: "/recipes", label: "Recipes", icon: Utensils },
      { to: "/shopping", label: "Shopping List", icon: ShoppingCart },
      { to: "/trips", label: "Trips", icon: Plane },
      { to: "/weather", label: "Weather", icon: CloudSun },
    ],
  },
  {
    title: "Hiburan & Kreativitas",
    items: [
      { to: "/movies", label: "Movies", icon: Film },
      { to: "/games", label: "Games", icon: Gamepad2 },
      { to: "/podcasts", label: "Podcasts", icon: Podcast },
      { to: "/music", label: "Music", icon: Music },
      { to: "/events", label: "Events", icon: Ticket },
      { to: "/design", label: "Design", icon: PenTool },
      { to: "/photography", label: "Photography", icon: Camera },
      { to: "/writing", label: "Writing", icon: Type },
      { to: "/code", label: "Code", icon: Code },
    ],
  },
  {
    title: "Alat & Produktivitas",
    items: [
      { to: "/task-manager", label: "Task Manager", icon: CheckSquare },
      { to: "/pomodoro", label: "Pomodoro Timer", icon: Timer },
      { to: "/eisenhower", label: "Eisenhower Matrix", icon: Grid2X2 },

      { to: "/incoterms", label: "Panduan Incoterms", icon: Navigation },
    ],
  },
  {
    title: "Syariah & Muamalah",
    items: [
      { to: "/syariah", label: "Pasar Muamalah", icon: Activity },
      { to: "/syariah/indeks", label: "Indeks Sharia", icon: LineChart },
      { to: "/syariah/terlarang", label: "Transaksi Terlarang", icon: AlertTriangle },
      { to: "/syariah/akad", label: "Akad Syariah", icon: FileText },
      { to: "/syariah/asuransi", label: "Asuransi Syariah", icon: Shield },
      { to: "/zakat", label: "Kalkulator Zakat", icon: HeartHandshake },
    ],
  },
] as const;

export const navKlien = [
  {
    title: "Portal Klien",
    items: [
      { to: "/portal", label: "Ringkasan", icon: LayoutDashboard },
      { to: "/portal/progres", label: "Progres", icon: Gauge },
      { to: "/portal/pesan", label: "Pesan", icon: MessagesSquare },
      { to: "/portal/jadwal", label: "Jadwal", icon: CalendarClock },
      { to: "/portal/dokumen", label: "Dokumen", icon: FolderOpen },
    ],
  },
] as const;

function NavGroup({ title, items }: { title: string; items: any[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActiveGroup = items.some((item) => {
    if (item.to === "/" || item.to === "/portal") {
      return pathname === item.to;
    }
    return pathname.startsWith(item.to);
  });

  return (
    <div className={`mb-4 last:mb-0 rounded-xl transition-all ${isActiveGroup ? 'py-2.5 nav-gooey-active shadow-[-4px_0_12px_rgba(0,0,0,0.02)]' : 'py-1'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between pr-3 pl-[22px] py-1.5 text-sm font-bold tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <span className={isActiveGroup ? "text-foreground" : ""}>{title}</span>
        {isOpen ? <ChevronDown className={`size-3 ${isActiveGroup ? "text-foreground" : ""}`} /> : <ChevronRight className="size-3" />}
      </button>
      {isOpen && (
        <div className="mt-1 flex flex-col gap-0.5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" || item.to === "/portal" }}
              className="flex items-center gap-2.5 rounded-lg pl-[27px] pr-3 py-2 text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground relative"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sisiKlien = pathname.startsWith("/portal");
  const peran = sisiKlien ? "klien" : "konsultan";
  const rawNav = sisiKlien ? navKlien : navKonsultan;
  const { enabledMenus, toggleMenu } = useMenuSettings();

  const nav = rawNav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => enabledMenus[item.to] !== false),
    }))
    .filter((group) => group.items.length > 0);

  let categoryName = "Umum";
  const exactItem = rawNav.flatMap((g) => g.items).find((i) => i.to === pathname);
  if (exactItem) {
    categoryName = rawNav.find((g) => g.items.includes(exactItem))?.title || "Umum";
  } else {
    const fallbackItem = rawNav
      .flatMap((g) => g.items)
      .find((i) => i.to !== "/" && pathname.startsWith(i.to));
    if (fallbackItem) {
      categoryName = rawNav.find((g) => g.items.includes(fallbackItem))?.title || "Umum";
    }
  }

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        const mobileContainer = document.querySelector('.lg\\:hidden.overflow-x-auto') as HTMLElement;
        if (mobileContainer) {
          const activeElement = mobileContainer.querySelector('.\\!bg-accent') as HTMLElement;
          if (activeElement) {
            const containerRect = mobileContainer.getBoundingClientRect();
            const activeRect = activeElement.getBoundingClientRect();
            const scrollLeft = mobileContainer.scrollLeft + (activeRect.left - containerRect.left) - containerRect.width / 2 + activeRect.width / 2;
            mobileContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
          }
        }
      } else {
        const sidebarContainer = document.querySelector('.bg-sidebar .overflow-y-auto') as HTMLElement;
        if (sidebarContainer) {
          const activeElement = sidebarContainer.querySelector('.nav-gooey-active') as HTMLElement;
          if (activeElement) {
            const containerRect = sidebarContainer.getBoundingClientRect();
            const activeRect = activeElement.getBoundingClientRect();
            const scrollTop = sidebarContainer.scrollTop + (activeRect.top - containerRect.top) - containerRect.height / 2 + activeRect.height / 2;
            sidebarContainer.scrollTo({ top: scrollTop, behavior: "smooth" });
          }
        }
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const handleOpenSettings = (tab = "general") => {
    setActiveSettingsTab(tab);
    setIsSettingsOpen(true);
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={activeSettingsTab}
      />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col bg-sidebar px-3 py-5 lg:flex">
        <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -ml-3 pl-3 -mr-5 pr-5 relative z-20">
          <nav className="flex flex-col py-4">
            {nav.map((group) => (
              <NavGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </nav>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1.5 shrink-0 relative z-20">
          <Link
            to="/favorit"
            className="flex items-center justify-center py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Favorit"
            activeProps={{ className: "!bg-accent !text-foreground font-medium border-border" }}
          >
            <Star size={18} />
          </Link>
          <button
            className={`flex items-center justify-center py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md ${isProfileOpen ? "!bg-accent !text-foreground font-medium" : ""}`}
            title="Profil"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User size={18} />
          </button>
          <button
            className="flex items-center justify-center py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Atur Menu"
            onClick={() => handleOpenSettings("menu")}
          >
            <MoreHorizontal size={18} />
          </button>
          <button
            className="flex items-center justify-center py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Pengaturan"
            onClick={() => handleOpenSettings("general")}
          >
            <Settings size={18} />
          </button>
          <ProfileMenu
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            onOpenSettings={handleOpenSettings}
          />
        </div>
      </aside>
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 bg-background/60 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="min-w-0 flex flex-col">
              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
              <div className="mt-1 flex items-center font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="truncate">{categoryName}</span>
                <span className="mx-2 text-muted-foreground/40">/</span>
                <span className="truncate">{title}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {actions}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Search"
              >
                <Search className="size-4" />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 relative items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
              </button>
              <ThemeLangToggle />
              <ProfileSwitch />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-t border-border px-3 py-2 lg:hidden">
            {nav
              .flatMap((g) => g.items)
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" || item.to === "/portal" }}
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-muted-foreground"
                  activeProps={{ className: "!bg-accent !text-foreground font-medium" }}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </header>
        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
