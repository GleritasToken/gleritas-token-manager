import { Card, CardContent } from "@/components/ui/card";

const tokenomicsData = [
  { label: "Pre-Sale", percentage: 25, color: "bg-yellow-500" },
  { label: "Liquidity & Exchanges", percentage: 20, color: "bg-green-500" },
  { label: "Staking and Rewards", percentage: 20, color: "bg-blue-500" },
  { label: "Development & Marketing", percentage: 20, color: "bg-purple-500" },
  { label: "Airdrop Campaign", percentage: 5, color: "bg-red-500" },
  { label: "Team & Advisors", percentage: 10, color: "bg-gray-500" },
];

export function TokenomicsChart() {
  return (
    <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
      {/* 3D Pie Chart */}
      <div className="w-48 h-48 mx-auto lg:mx-0 relative">
        <div className="w-full h-full rounded-full relative shadow-2xl bg-gradient-to-br from-yellow-400 via-green-500 via-blue-500 via-purple-500 via-red-500 to-gray-500 animate-pulse">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
          <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">1B</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">GLRS</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex-1 space-y-3">
        {tokenomicsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 ${item.color} rounded-full shadow-sm`}></div>
              <span className="text-gray-800 dark:text-white font-medium text-sm">
                {item.label}
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-300 font-semibold">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
