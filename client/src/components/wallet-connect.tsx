import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SuccessPopup } from "./success-popup";
import { Wallet, X } from "lucide-react";

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnect({ isOpen, onClose }: WalletConnectProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const walletConnectMutation = useMutation({
    mutationFn: async (walletAddress: string) => {
      return await apiRequest("POST", "/api/user/connect-wallet", { walletAddress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      onClose();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleWalletConnect = (walletType: string) => {
    // Generate a mock BSC wallet address for demo purposes
    const mockWalletAddress = "0x" + Math.random().toString(16).substring(2, 42);
    walletConnectMutation.mutate(mockWalletAddress);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Connect Your Wallet
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please connect your BSC wallet to access tasks and earn rewards
              </p>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              onClick={() => handleWalletConnect("MetaMask")}
              disabled={walletConnectMutation.isPending}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-medium">MetaMask</span>
            </Button>
            
            <Button
              onClick={() => handleWalletConnect("Trust Wallet")}
              disabled={walletConnectMutation.isPending}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-medium">Trust Wallet</span>
            </Button>
            
            <Button
              onClick={() => handleWalletConnect("Binance Chain Wallet")}
              disabled={walletConnectMutation.isPending}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-medium">Binance Chain Wallet</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Wallet Connected!"
        message="You earned 100 points for connecting your wallet"
      />
    </>
  );
}
