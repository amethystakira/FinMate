import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import GoalsPage from "@/pages/goals";
import ChatPage from "@/pages/chat";
import LinkBankPage from "@/pages/link-bank";
import AboutPage from "@/pages/about";
import SettingsPage from "@/pages/settings";
import ExpensesPage from "@/pages/expenses";
import BudgetPage from "@/pages/budget";
import LoanEligibilityPage from "@/pages/loan-eligibility";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/goals" component={GoalsPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/link-bank" component={LinkBankPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/expenses" component={ExpensesPage} />
      <Route path="/budget" component={BudgetPage} />
      <Route path="/loans" component={LoanEligibilityPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
