
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Receitas do Mês",
      value: "R$ 128.450,00",
      change: "+12,5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-e2l-success"
    },
    {
      title: "Despesas do Mês", 
      value: "R$ 89.230,00",
      change: "+5,2%",
      trend: "up",
      icon: TrendingDown,
      color: "text-e2l-danger"
    },
    {
      title: "Saldo Atual",
      value: "R$ 39.220,00",
      change: "+18,7%",
      trend: "up", 
      icon: DollarSign,
      color: "text-e2l-secondary"
    },
    {
      title: "Meta do Mês",
      value: "78% atingida",
      change: "R$ 150.000",
      trend: "up",
      icon: Target,
      color: "text-e2l-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="card-elevated hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-e2l-primary mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-gray-500">
              <span className={stat.trend === 'up' ? 'text-e2l-success' : 'text-e2l-danger'}>
                {stat.change}
              </span>
              {" "}vs mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
