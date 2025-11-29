import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

const expenseData = [
  { name: "Housing", value: 15000, color: "#3b82f6" },
  { name: "Food", value: 8500, color: "#f97316" },
  { name: "Transport", value: 4200, color: "#8b5cf6" },
  { name: "Shopping", value: 6800, color: "#ec4899" },
  { name: "Utilities", value: 3500, color: "#10b981" },
  { name: "Entertainment", value: 2500, color: "#f59e0b" },
];

const monthlyData = [
  { name: "Week 1", amount: 8400 },
  { name: "Week 2", amount: 12500 },
  { name: "Week 3", amount: 9200 },
  { name: "Week 4", amount: 10400 },
];

const transactions = [
  { id: 1, name: "Netflix Subscription", date: "Today, 10:00 AM", amount: -649, category: "Entertainment", type: "expense" },
  { id: 2, name: "Salary Credited", date: "Yesterday, 9:00 AM", amount: 45000, category: "Salary", type: "income" },
  { id: 3, name: "Grocery Store", date: "Yesterday, 6:30 PM", amount: -2400, category: "Food", type: "expense" },
  { id: 4, name: "Uber Ride", date: "26 Nov, 2:15 PM", amount: -350, category: "Transport", type: "expense" },
  { id: 5, name: "Electric Bill", date: "25 Nov, 11:00 AM", amount: -1240, category: "Utilities", type: "expense" },
  { id: 6, name: "Freelance Payment", date: "24 Nov, 4:00 PM", amount: 12000, category: "Income", type: "income" },
  { id: 7, name: "Amazon Purchase", date: "23 Nov, 8:45 PM", amount: -4500, category: "Shopping", type: "expense" },
];

export default function ExpensesPage() {
  const [filter, setFilter] = useState("all");

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses & Income</h1>
            <p className="text-muted-foreground">Detailed breakdown of your financial activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="this_month">
               <SelectTrigger className="w-[140px]">
                 <SelectValue placeholder="Period" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="this_month">This Month</SelectItem>
                 <SelectItem value="last_month">Last Month</SelectItem>
                 <SelectItem value="last_3_months">Last 3 Months</SelectItem>
               </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money went this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => `₹${value.toLocaleString()}`}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Spending Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Spending</CardTitle>
              <CardDescription>Spending trends per week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `₹${v/1000}k`} />
                    <RechartsTooltip 
                      cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.2 }}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-secondary/20 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'}`}>
                      {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[140px]">
                    {t.category === 'Income' && <Badge variant="secondary" className="gap-1"><Briefcase className="w-3 h-3" /> Gig Work</Badge>}
                    <Badge variant="outline" className="capitalize">{t.category}</Badge>
                    <p className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-foreground'}`}>
                      {t.type === 'income' ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
