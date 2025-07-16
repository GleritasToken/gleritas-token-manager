import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Lock, AlertCircle } from "lucide-react";

export default function Withdrawal() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Locked Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                Withdrawal Currently Locked
              </h3>
              <div className="bg-yellow-100 dark:bg-yellow-800/20 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-yellow-800 dark:text-yellow-300 text-sm font-medium mb-1">
                      Important Notice:
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                      The withdrawal system is currently locked till airdrop ends. We are working on implementing a secure token distribution mechanism. Once ready, you'll be able to withdraw GLRS tokens directly to your connected wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Points Balance */}
            <div className="text-center py-8">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Your Current Balance</p>
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {user?.points?.toLocaleString() || 0}
                    </p>
                    <p className="text-sm text-blue-100">Points</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  💡 Keep earning points by completing tasks and referring friends. Your points will be converted to GLRS tokens when the withdrawal system is activated!
                </p>
              </div>
            </div>

            {/* Future Features Preview */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                Coming Soon:
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Direct GLRS token withdrawal to your wallet
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Real-time token conversion rates
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Withdrawal history and tracking
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
