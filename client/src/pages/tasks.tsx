import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Check, ExternalLink, Users, MessageCircle, Twitter, Youtube, ThumbsUp } from "lucide-react";

const getTaskIcon = (taskType: string) => {
  switch (taskType) {
    case "referral":
      return <Users className="w-5 h-5" />;
    case "telegram":
      return <MessageCircle className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "youtube":
      return <Youtube className="w-5 h-5" />;
    default:
      return <Check className="w-5 h-5" />;
  }
};

export default function Tasks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      return await apiRequest("POST", `/api/tasks/${taskId}/complete`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Task Completed!",
        description: `You earned ${data.task?.points || 0} points`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading tasks...</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks?.filter((task: any) => task.completed) || [];
  const uncompletedTasks = tasks?.filter((task: any) => !task.completed) || [];

  const handleCompleteTask = (taskId: number) => {
    if (!user?.walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to complete tasks",
        variant: "destructive",
      });
      return;
    }
    completeTaskMutation.mutate(taskId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-4 pt-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              Available Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="uncompleted" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="uncompleted">
                  Uncompleted ({uncompletedTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedTasks.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="uncompleted" className="space-y-4 mt-4">
                {uncompletedTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Congratulations! You've completed all available tasks.
                    </p>
                  </div>
                ) : (
                  uncompletedTasks.map((task: any) => (
                    <Card key={task.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                              {getTaskIcon(task.task.taskType)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                                {task.task.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {task.task.description}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                  {task.task.points} points
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {task.task.taskType}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Button
                              onClick={() => handleCompleteTask(task.taskId)}
                              disabled={completeTaskMutation.isPending}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {completeTaskMutation.isPending ? "Completing..." : "Complete"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4 mt-4">
                {completedTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      No completed tasks yet. Start earning points!
                    </p>
                  </div>
                ) : (
                  completedTasks.map((task: any) => (
                    <Card key={task.id} className="opacity-75">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                              {getTaskIcon(task.task.taskType)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                                {task.task.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {task.task.description}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                  +{task.task.points} points
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {task.task.taskType}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                              <Check className="w-4 h-4 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
