import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
}

export function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-black p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-black">{title}</p>
          <p className="text-3xl font-bold text-black">{value}</p>
          {change && (
            <p className={cn(
              'text-sm font-medium mt-1',
              changeType === 'positive' ? 'text-black' : 'text-black'
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-100">
          {icon}
        </div>
      </div>
    </div>
  );
}