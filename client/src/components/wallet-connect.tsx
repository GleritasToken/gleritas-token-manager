import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SuccessPopup } from "./success-popup";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnect({ isOpen, onClose }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const walletConnectMutation = useMutation({
    mutationFn: async (address: string) => {
      return await apiRequest("POST", "/api/user/connect-wallet", { walletAddress: address });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      onClose();
      setWalletAddress("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid BSC wallet address",
        variant: "destructive",
      });
      return;
    }
    
    walletConnectMutation.mutate(walletAddress.trim());
  };



  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-800 dark:text-white">
              Connect Your BSC Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enter your BSC wallet address to connect and earn 100 points
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                BSC Wallet Address
              </Label>
              <Input
                id="wallet-address"
                type="text"
                placeholder="0x1234567890123456789012345678901234567890"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full"
                disabled={walletConnectMutation.isPending}
              />
            </div>



            <Button
              type="submit"
              disabled={walletConnectMutation.isPending || !walletAddress.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              {walletConnectMutation.isPending ? "Connecting..." : "Connect Wallet"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Make sure you enter a valid BSC (Binance Smart Chain) wallet address
            </p>
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
