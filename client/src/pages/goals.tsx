import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Trophy, Plus, Trash2, Flag, Coffee, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  type: 'saving' | 'challenge';
  icon: any;
  color: string;
}

export default function GoalsPage() {
  const { t } = useLanguage();
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Emergency Fund", target: 100000, current: 45000, type: 'saving', icon: Target, color: 'blue' },
    { id: 2, title: "Limit Coffee Spend", target: 500, current: 120, type: 'challenge', icon: Coffee, color: 'orange' },
    { id: 3, title: "Goa Trip", target: 25000, current: 8000, type: 'saving', icon: Flag, color: 'green' },
  ]);

  const [newGoal, setNewGoal] = useState({ title: "", target: "", type: "saving" });
  const [isOpen, setIsOpen] = useState(false);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseInt(newGoal.target),
      current: 0,
      type: newGoal.type as 'saving' | 'challenge',
      icon: newGoal.type === 'challenge' ? Trophy : Target,
      color: newGoal.type === 'challenge' ? 'purple' : 'blue'
    };

    setGoals([...goals, goal]);
    setIsOpen(false);
    setNewGoal({ title: "", target: "", type: "saving" });
    toast({
      title: "Goal Created",
      description: "We'll help you stay on track!",
    });
  };

  const handleDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
    toast({
      title: "Goal Deleted",
      description: "Goal removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('goals')}</h1>
          <p className="text-muted-foreground mt-1">Track your savings and financial challenges</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" /> {t('add_goal')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('add_goal')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Goal Title</Label>
                <Input 
                  value={newGoal.title} 
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g. Buy New Laptop"
                />
              </div>
              <div className="space-y-2">
                <Label>Target Amount (₹)</Label>
                <Input 
                  type="number"
                  value={newGoal.target} 
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  placeholder="50000"
                />
              </div>
               <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                    <Button 
                        type="button" 
                        variant={newGoal.type === 'saving' ? 'default' : 'outline'}
                        onClick={() => setNewGoal({...newGoal, type: 'saving'})}
                        className="flex-1"
                    >
                        Saving Goal
                    </Button>
                    <Button 
                        type="button" 
                        variant={newGoal.type === 'challenge' ? 'default' : 'outline'}
                        onClick={() => setNewGoal({...newGoal, type: 'challenge'})}
                        className="flex-1"
                    >
                        Spending Challenge
                    </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddGoal}>{t('save')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-all group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className={`absolute top-0 left-0 w-1 h-full ${goal.type === 'challenge' ? 'bg-purple-500' : 'bg-blue-500'}`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-xl ${goal.type === 'challenge' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
                  <goal.icon className="w-5 h-5" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(goal.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="mt-4 text-lg">{goal.title}</CardTitle>
              <CardDescription>
                {goal.type === 'challenge' ? 'Daily Challenge' : 'Savings Goal'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-muted-foreground">
                  ₹{goal.current.toLocaleString()}
                </span>
                <span>
                  ₹{goal.target.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={(goal.current / goal.target) * 100} 
                className="h-2.5" 
                indicatorClassName={goal.type === 'challenge' ? 'bg-purple-500' : 'bg-blue-500'}
              />
              <p className="text-xs text-right mt-2 text-muted-foreground">
                {Math.round((goal.current / goal.target) * 100)}% {t('progress')}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-xs h-8 hover:bg-primary hover:text-white transition-colors">
                <Plus className="w-3 h-3 mr-1" /> Add Funds
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
