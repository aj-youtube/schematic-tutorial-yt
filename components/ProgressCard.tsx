import { Card, CardContent } from "@/components/ui/card";

interface ProgressCardProps {
  current: number;
  max?: number; // optional for unlimited use
  label?: string;
}

export default function ProgressCard({ current, max, label = "Usage" }: ProgressCardProps) {
  const isUnlimited = !max || isNaN(max) || max === Infinity;
  const percentage = isUnlimited ? 0 : Math.min((current / max!) * 100, 100);
  const exceeded = !isUnlimited && current >= max!;

  const getBarColor = () => {
    if (exceeded) return "bg-red-500";
    if (percentage < 33) return "bg-blue-500";
    if (percentage < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{label}</h3>
          <span className="text-sm text-muted-foreground">
            {isUnlimited ? `∞` : `${current} / ${max}`}
          </span>
        </div>

        {!isUnlimited && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getBarColor()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="text-right text-xs text-gray-500">
              {exceeded ? (
                <span className="text-red-600 font-medium">Limit reached</span>
              ) : (
                `${Math.round(percentage)}% used`
              )}
            </div>
          </>
        )}
        

        {isUnlimited && (
            <>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 bg-green-500`}
                        style={{ width: `100%` }}
                      />
                    </div>
          <div className="text-right text-xs text-green-600 font-medium">
            Unlimited usage
          </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
