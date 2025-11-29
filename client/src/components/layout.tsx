import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Target, 
  CreditCard, 
  Bell, 
  Search, 
  Menu,
  LogOut,
  Globe,
  MessageSquareText,
  Info,
  Link as LinkIcon,
  Moon,
  Sun,
  Settings,
  PieChart,
  Wallet,
  Landmark
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpeechInput } from "@/components/ui/speech-input";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { t, current, setLanguage } = useLanguage();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Bill Due", message: "Electricity bill due tomorrow", read: false },
    { id: 2, title: "Salary Credited", message: "Your salary has been credited", read: false },
    { id: 3, title: "Loan Approved", message: "Your loan application was approved", read: true },
  ]);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const NavLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
        location === href 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{t('app_name')}</span>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-2">
        <NavLink href="/dashboard" icon={LayoutDashboard} label={t('dashboard')} />
        <NavLink href="/expenses" icon={PieChart} label="Expenses" />
        <NavLink href="/budget" icon={Wallet} label="Budget" />
        <NavLink href="/loans" icon={Landmark} label="Loans & Credit" />
        <NavLink href="/goals" icon={Target} label={t('goals')} />
        <NavLink href="/chat" icon={MessageSquareText} label={t('chat')} />
        <div className="pt-4 mt-4 border-t border-border">
          <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Settings</p>
          <NavLink href="/link-bank" icon={LinkIcon} label={t('link_bank')} />
          <NavLink href="/settings" icon={Settings} label="Settings" />
          <NavLink href="/about" icon={Info} label={t('about')} />
        </div>
      </div>

      <div className="px-4 mt-auto">
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white mb-4 shadow-lg dark:from-slate-800 dark:to-slate-900">
          <p className="text-sm font-medium opacity-90 mb-1">Pro Member</p>
          <p className="text-xs opacity-70 mb-3">Valid until Dec 2025</p>
          <Button variant="secondary" size="sm" className="w-full h-8 text-xs bg-white/10 hover:bg-white/20 text-white border-none">Upgrade Plan</Button>
        </div>
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl cursor-pointer transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border bg-card/50 backdrop-blur-xl fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 px-6 lg:px-10 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <span className="text-lg font-bold">{t('app_name')}</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
             <SpeechInput 
                placeholder={t('search_placeholder')}
                className="w-full bg-secondary/50 border-none rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
             />
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-secondary"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-secondary">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>हिंदी (Hindi)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bn')}>বাংলা (Bengali)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ta')}>தமிழ் (Tamil)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('te')}>తెలుగు (Telugu)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('mr')}>मराठी (Marathi)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('gu')}>ગુજરાતી (Gujarati)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de')}>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-secondary">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background animate-pulse" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-border flex justify-between items-center bg-card/50">
                  <h4 className="font-semibold">{t('notifications')}</h4>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs h-auto p-0 text-primary hover:text-primary/80">
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-4 hover:bg-secondary/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <p className={`text-sm font-medium ${!n.read ? 'text-primary' : 'text-foreground'}`}>{n.title}</p>
                            {!n.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No notifications
                    </div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-3 pl-2 border-l border-border">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold">Alex Morgan</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white dark:ring-slate-800">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
