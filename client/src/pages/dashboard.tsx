import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UpcomingBills, BankStatementUpload } from "@/components/dashboard-widgets";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Filter, Download, IndianRupee, PiggyBank, Trophy, Medal, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const data = [
  { name: "Jan", income: 45000, expense: 24000 },
  { name: "Feb", income: 45000, expense: 28000 },
  { name: "Mar", income: 48000, expense: 22000 },
  { name: "Apr", income: 45000, expense: 39000 },
  { name: "May", income: 52000, expense: 35000 },
  { name: "Jun", income: 63000, expense: 38000 },
  { name: "Jul", income: 58000, expense: 43000 },
];

const expenseData = [
  { name: "Housing", value: 15000, color: "#3b82f6" },
  { name: "Food", value: 8500, color: "#f97316" },
  { name: "Transport", value: 4200, color: "#8b5cf6" },
  { name: "Shopping", value: 6800, color: "#ec4899" },
  { name: "Utilities", value: 3500, color: "#10b981" },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState("this_month");

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: `Generating PDF report for ${dateRange.replace('_', ' ')}...`,
    });
    setTimeout(() => {
        toast({
            title: "Download Ready",
            description: "Finmate_Report_2025.pdf downloaded successfully.",
            variant: "default",
        });
    }, 1500);
  };

  const handleFilterChange = (value: string) => {
      setDateRange(value);
      toast({
          title: "Filter Applied",
          description: `Dashboard updated for ${value.replace('_', ' ')}`,
      });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
            <p className="text-muted-foreground">Overview of your financial health</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={handleFilterChange}>
               <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur-sm">
                 <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                 <SelectValue placeholder={t('filter')} />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="this_month">This Month</SelectItem>
                 <SelectItem value="last_month">Last Month</SelectItem>
                 <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                 <SelectItem value="this_year">This Year</SelectItem>
               </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm" onClick={handleExport}>
              <Download className="w-4 h-4" />
              {t('export')}
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('income')}</p>
                  <h3 className="text-2xl font-bold mt-2 tracking-tight flex items-center"><IndianRupee className="w-5 h-5" /> 82,400</h3>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 shadow-sm">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('expense')}</p>
                  <h3 className="text-2xl font-bold mt-2 tracking-tight flex items-center"><IndianRupee className="w-5 h-5" /> 38,500</h3>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 shadow-sm">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Savings</p>
                  <h3 className="text-2xl font-bold mt-2 tracking-tight flex items-center"><IndianRupee className="w-5 h-5" /> 43,900</h3>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 shadow-sm">
                  <PiggyBank className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-indigo-100">Financial Health</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Medal className="w-6 h-6 text-yellow-300" />
                    <h3 className="text-2xl font-bold tracking-tight">Gold</h3>
                  </div>
                  <p className="text-xs text-indigo-100 mt-1">Top 10% Saver!</p>
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                     <span className="text-xs text-indigo-200">Tax Est. (FY25)</span>
                     <span className="text-sm font-bold">₹12,500</span>
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl text-white shadow-sm">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
                <CardDescription>Income vs Expenses Over Time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} 
                        dy={10} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} 
                        dx={-10} 
                        tickFormatter={(value) => `₹${value/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderRadius: '12px', 
                          border: '1px solid hsl(var(--border))', 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          color: 'hsl(var(--foreground))'
                        }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                        cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '5 5' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        name="Income"
                        stroke="#22c55e" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expense" 
                        name="Expenses"
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorExpense)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown and Goals Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>This Month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip 
                           formatter={(value) => `₹${value.toLocaleString()}`}
                           contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                 <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                       <CardTitle className="text-base">Goals</CardTitle>
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Plus className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2 group">
                          <div className="flex justify-between text-sm">
                             <span>New Bike</span>
                             <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">65%</span>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                             </div>
                          </div>
                          <Progress value={65} className="h-2" />
                       </div>
                       <div className="space-y-2 group">
                          <div className="flex justify-between text-sm">
                             <span>Emergency Fund</span>
                             <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">30%</span>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                             </div>
                          </div>
                          <Progress value={30} className="h-2" />
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm border-l-4 border-l-orange-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                       <CardTitle className="text-base flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-orange-500" /> 
                          Challenges
                       </CardTitle>
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Plus className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent>
                       <div className="group relative">
                           <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-medium">Spend &lt; ₹100 on Coffee</p>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 absolute right-0 -top-1 opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                           </div>
                           <p className="text-xs text-muted-foreground mt-1">Current: ₹45 / ₹100</p>
                           <Progress value={45} className="h-1.5 mt-2 bg-orange-100 dark:bg-orange-900/20" indicatorClassName="bg-orange-500" />
                       </div>
                    </CardContent>
                 </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpcomingBills />
              <BankStatementUpload />
            </div>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                   <Trophy className="w-5 h-5" /> Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                 <div className="flex justify-between items-end mb-4">
                    <div>
                       <p className="text-sm font-medium opacity-90">Available Points</p>
                       <h3 className="text-3xl font-bold">2,450</h3>
                    </div>
                    <Button size="sm" variant="secondary" className="text-orange-600 bg-white hover:bg-white/90">Redeem</Button>
                 </div>
                 <p className="text-xs opacity-80">You're 550 points away from a ₹500 Amazon Voucher!</p>
                 <Progress value={82} className="h-1.5 mt-3 bg-black/20" indicatorClassName="bg-white" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-1">Loan Eligibility</h3>
                <p className="text-slate-400 text-sm mb-4">Check your pre-approved offers</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">₹50L</span>
                  <span className="text-sm text-slate-400">Max Amount</span>
                </div>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100" onClick={() => window.location.href='/loans'}>
                  Check Eligibility
                </Button>
              </div>
            </Card>

            <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('recent_transactions')}</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">See all</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/40 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-background transition-colors shadow-sm">
                          <span className="text-xs font-bold text-primary">U</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">UPI Payment - Zomato</p>
                          <p className="text-xs text-muted-foreground">Today, 10:00 AM</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-foreground">-₹450</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
