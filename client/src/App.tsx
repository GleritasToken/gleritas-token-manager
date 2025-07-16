import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Tasks from "@/pages/tasks";
import Referral from "@/pages/referral";
import Withdrawal from "@/pages/withdrawal";
import About from "@/pages/about";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import BottomNav from "@/components/bottom-nav";
import NotFound from "@/pages/not-found";

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if on admin routes
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  
  if (!user && !isAdminRoute) {
    return <Landing />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/referral" component={Referral} />
        <Route path="/withdrawal" component={Withdrawal} />
        <Route path="/about" component={About} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
      {/* Only show bottom nav for authenticated users and not on admin pages */}
      {user && !isAdminRoute && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
