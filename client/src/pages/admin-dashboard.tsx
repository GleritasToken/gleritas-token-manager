import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Users, ListTodo, Plus, Edit, Trash2, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"users" | "tasks">("users");
  const { admin, isAuthenticated } = useAdminAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated,
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["/api/admin/tasks"],
    enabled: isAuthenticated,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/admin/login");
      toast({
        title: "Logged Out",
        description: "Successfully logged out from admin panel",
        variant: "default",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      await apiRequest("DELETE", `/api/admin/users/${userId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await apiRequest("DELETE", `/api/admin/tasks/${taskId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tasks"] });
      toast({
        title: "Task Deleted",
        description: "Task has been successfully deleted",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete task",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please log in to access the admin panel
            </p>
            <Button onClick={() => navigate("/admin/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                GLRS Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome, {admin?.username}
              </p>
            </div>
          </div>
          <Button
            onClick={() => logoutMutation.mutate()}
            variant="outline"
            className="text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "users"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Users ({users.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "tasks"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span>Tasks ({tasks.length})</span>
            </button>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Management</span>
                <Badge variant="secondary">{users.length} total users</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Wallet
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referral Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user: any) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.username}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                              {user.points} pts
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge variant={user.walletConnected ? "default" : "secondary"}>
                              {user.walletConnected ? "Connected" : "Not Connected"}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                              {user.referralCode}
                            </code>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteUserMutation.mutate(user.id)}
                              disabled={deleteUserMutation.isPending}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Task Management</span>
                <Badge variant="secondary">{tasks.length} total tasks</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tasksLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Loading tasks...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Task
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {tasks.map((task: any) => (
                        <tr key={task.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {task.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge variant="outline">
                              {task.taskType}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
                              {task.points} pts
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge variant={task.isActive ? "default" : "secondary"}>
                              {task.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTaskMutation.mutate(task.id)}
                              disabled={deleteTaskMutation.isPending}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}