import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenomicsChart } from "@/components/tokenomics-chart";
import { ExternalLink, FileText, MessageCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-4 pt-4">
        {/* About Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              About Gleritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Gleritas (GLRS) is a next-generation blockchain-powered cryptocurrency built to seamlessly connect the world of digital assets with the fast-growing e-commerce industry. Our mission is to empower both merchants and consumers by providing fast, secure, and cost-effective payment solutions that goes beyond traditional systems.
            </p>
          </CardContent>
        </Card>

        {/* Tokenomics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
              Tokenomics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TokenomicsChart />
          </CardContent>
        </Card>

        {/* Learn More */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
              To Learn More About Gleritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <a
                href="https://drive.google.com/file/d/1d1e154XQTxAb-JRizElQgGpjMx8yJvmk/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-800 dark:text-white font-medium">
                    GLRS Token Whitepaper
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </a>
              
              <a
                href="https://t.me/+hcJdayisPFIxOGVk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-800 dark:text-white font-medium">
                    Telegram Group
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </a>
              
              <a
                href="https://t.me/gleritaschat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-800 dark:text-white font-medium">
                    Telegram Channel
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
