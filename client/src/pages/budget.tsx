import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, MoreHorizontal, AlertTriangle, TrendingDown, DollarSign, ShoppingBag, Coffee, Car, Home } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { id: 1, name: "Housing", spent: 15000, limit: 20000, icon: Home, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" },
  { id: 2, name: "Food & Dining", spent: 8500, limit: 10000, icon: Coffee, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20" },
  { id: 3, name: "Transportation", spent: 4200, limit: 5000, icon: Car, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/20" },
  { id: 4, name: "Shopping", spent: 6800, limit: 5000, icon: ShoppingBag, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/20", alert: true },
];

export default function BudgetPage() {
  const [newBudgetOpen, setNewBudgetOpen] = useState(false);

  const handleCreateBudget = () => {
    setNewBudgetOpen(false);
    toast({
      title: "Budget Created",
      description: "New budget category added successfully.",
    });
  };

  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const totalLimit = categories.reduce((acc, cat) => acc + cat.limit, 0);
  const totalProgress = (totalSpent / totalLimit) * 100;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
            <p className="text-muted-foreground">Track your spending limits and savings goals.</p>
          </div>
          <Dialog open={newBudgetOpen} onOpenChange={setNewBudgetOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Create Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input placeholder="e.g., Entertainment" />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Limit (₹)</Label>
                  <Input type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateBudget}>Create Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overall Budget */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-slate-400 font-medium mb-1">Overall Monthly Budget</p>
                <h2 className="text-4xl font-bold">₹{totalSpent.toLocaleString()} <span className="text-xl text-slate-400 font-normal">/ ₹{totalLimit.toLocaleString()}</span></h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Remaining</p>
                <p className="text-2xl font-bold text-green-400">₹{(totalLimit - totalSpent).toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>0%</span>
                <span>{Math.round(totalProgress)}% used</span>
                <span>100%</span>
              </div>
              <Progress value={totalProgress} className="h-4 bg-slate-700" indicatorClassName={totalProgress > 90 ? "bg-red-500" : "bg-blue-500"} />
            </div>
            {totalProgress > 80 && (
              <div className="mt-4 flex items-center gap-2 text-amber-300 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm">You've used 80% of your monthly budget. Consider reducing discretionary spending.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const progress = (cat.spent / cat.limit) * 100;
            const isOver = cat.spent > cat.limit;
            
            return (
              <Card key={cat.id} className={`shadow-sm hover:shadow-md transition-all ${isOver ? 'border-red-200 dark:border-red-900/50' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bg} ${cat.color}`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{cat.name}</CardTitle>
                        <CardDescription>Monthly Limit: ₹{cat.limit.toLocaleString()}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Budget</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">₹{cat.spent.toLocaleString()}</span>
                        <span className="text-muted-foreground">{Math.round(progress)}%</span>
                      </div>
                      <Progress 
                        value={progress > 100 ? 100 : progress} 
                        className="h-2" 
                        indicatorClassName={isOver ? "bg-red-500" : cat.color.replace('text-', 'bg-')} 
                      />
                    </div>
                    {isOver ? (
                      <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Exceeded by ₹{(cat.spent - cat.limit).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" /> ₹{(cat.limit - cat.spent).toLocaleString()} left to spend
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
