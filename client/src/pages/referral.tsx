import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Users, Copy, Award, User, AlertCircle } from "lucide-react";

export default function Referral() {
  const { user, isLoading: userLoading } = useAuth();
  const { toast } = useToast();

  const { data: referralData, isLoading: referralLoading } = useQuery({
    queryKey: ["/api/referrals"],
    enabled: !!user, // Only fetch if user is authenticated
  });

  const copyReferralCode = async () => {
    if (user?.referralCode) {
      try {
        await navigator.clipboard.writeText(user.referralCode);
        toast({
          title: "Copied!",
          description: "Referral code copied to clipboard",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy referral code",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No Referral Code",
        description: "Referral code not available",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (userLoading || referralLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading referral data...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please log in to access your referral dashboard
          </p>
        </div>
      </div>
    );
  }

  const referralCount = referralData?.referralCount || 0;
  const progressPercentage = (referralCount / 50) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-4 pt-4">
        {/* Referral Stats */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-purple-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Referral System
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Referral Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Referrals</span>
                <span>{referralCount} / 50</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {50 - referralCount} more referrals to reach the maximum
              </p>
            </div>

            {/* Referral Code */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Your Referral Code</p>
              <div className="flex items-center space-x-2">
                <Input
                  value={user?.referralCode || "No referral code available"}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-700 font-mono text-center text-lg font-semibold"
                  placeholder="Loading referral code..."
                />
                <Button
                  onClick={copyReferralCode}
                  disabled={!user?.referralCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {!user?.referralCode && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Referral code not found. Please contact support if this persists.
                </p>
              )}
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {referralData?.totalEarnings || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Points Earned</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">250</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Per Referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
              Your Referrals ({referralCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!referralData?.referrals || referralData.referrals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No referrals yet. Share your referral code to start earning!
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    💡 Tip: Share your referral code with friends and earn 250 points for each successful referral!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {referralData.referrals.map((referral: any) => (
                  <div
                    key={referral.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {referral.referredUser.username}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Joined {new Date(referral.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        +{referral.pointsEarned} points
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
