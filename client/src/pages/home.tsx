import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { WalletConnect } from "@/components/wallet-connect";
import { Plus, Check, Wallet, LogOut } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showWalletConnect, setShowWalletConnect] = useState(false);

  const { data: tasks } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (user && !user.walletConnected) {
      const timer = setTimeout(() => {
        setShowWalletConnect(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!user) return null;

  const completedTasks = tasks?.filter((task: any) => task.completed) || [];
  const uncompletedTasks = tasks?.filter((task: any) => !task.completed) || [];
  const recentTasks = completedTasks.slice(0, 5);
  const hasMoreTasks = completedTasks.length > 5;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Gleritas</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                disabled={logoutMutation.isPending}
              >
                <LogOut className="w-4 h-4 mr-1" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-4">
        {/* User Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Welcome back, {user.username}!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Your GLRS journey continues</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {user.points.toLocaleString()} Points
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Balance</div>
              </div>
            </div>
            
            {user.walletConnected ? (
              <div className="flex items-center justify-center py-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-600 dark:text-green-400 font-medium">Wallet Connected</span>
              </div>
            ) : (
              <Button
                onClick={() => setShowWalletConnect(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect BSC Wallet
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">New Tasks</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {uncompletedTasks.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completedTasks.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No completed tasks yet. Start earning points by completing tasks!
              </p>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{task.task.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          +{task.task.points} points
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                      Completed
                    </Badge>
                  </div>
                ))}
                {hasMoreTasks && (
                  <Button
                    variant="ghost"
                    className="w-full text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => window.location.href = "/tasks"}
                  >
                    Show More Tasks
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnect
        isOpen={showWalletConnect}
        onClose={() => setShowWalletConnect(false)}
      />
    </div>
  );
}
