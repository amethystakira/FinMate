import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { 
  Zap, 
  Wifi, 
  Droplets, 
  Smartphone, 
  ChevronRight, 
  CheckCircle2, 
  Upload,
  FileText,
  Loader2,
  Layers,
  IndianRupee,
  CreditCard,
  Plus,
  Mic
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SpeechInput } from "@/components/ui/speech-input";

export const UpcomingBills = () => {
  const { t } = useLanguage();
  const [bills, setBills] = useState([
    { id: 1, name: "Electricity", amount: "₹1,240", due: "Tomorrow", icon: Zap, status: "due" },
    { id: 2, name: "Internet", amount: "₹599", due: "in 3 days", icon: Wifi, status: "upcoming" },
    { id: 3, name: "Water", amount: "₹340", due: "in 5 days", icon: Droplets, status: "upcoming" },
    { id: 4, name: "Mobile", amount: "₹450", due: "in 1 week", icon: Smartphone, status: "paid" },
  ]);

  const payBill = (id: number) => {
    toast({
      title: "Payment Processing",
      description: "Redirecting to secure UPI gateway...",
    });
    setTimeout(() => {
      setBills(bills.map(b => b.id === id ? { ...b, status: "paid" } : b));
      toast({
        title: "Bill Paid Successfully",
        description: "Transaction ID: TXN882910",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <Card className="h-full shadow-sm border-border/50 hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('bills')}</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bills.filter(b => b.status !== 'paid').map((bill) => (
          <div key={bill.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-transparent hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
                <bill.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{bill.name}</p>
                <p className="text-xs text-muted-foreground">Due {bill.due}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm mb-1">{bill.amount}</p>
              <Button 
                size="sm" 
                className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary hover:text-white border-none shadow-none"
                onClick={() => payBill(bill.id)}
              >
                Pay Now
              </Button>
            </div>
          </div>
        ))}
        {bills.filter(b => b.status !== 'paid').length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-500 opacity-50" />
            <p>All bills paid!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const LoanEligibility = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/30 transition-colors"></div>
      
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {t('loan_eligibility')}
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">Excellent</Badge>
        </CardTitle>
        <CardDescription className="text-slate-400">Based on your CIBIL score & income</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">CIBIL Score</span>
            <span className="font-bold text-white">785 / 900</span>
          </div>
          <Progress value={87} className="h-2 bg-slate-700" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <p className="text-xs text-slate-400 mb-1">Max Amount</p>
            <p className="text-lg font-bold">₹50 Lakhs</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <p className="text-xs text-slate-400 mb-1">Interest Rate</p>
            <p className="text-lg font-bold">10.5%</p>
          </div>
        </div>

        <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-semibold">
          Check Offers <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export const BankStatementUpload = () => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [manualExpense, setManualExpense] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      setIsAnalyzing(true);
      
      // Simulate AI Parsing
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowCategoryModal(true);
      }, 2000);
    }
  };

  const handleCategoryConfirm = () => {
    setShowCategoryModal(false);
    toast({
      title: "Expenses Added",
      description: "Transactions categorized and added to your dashboard.",
      variant: "default", 
    });
  };

  const handleVoiceExpense = (text: string) => {
      setManualExpense(text);
      toast({
          title: "Voice Detected",
          description: `Logging: "${text}"`,
      });
      // Mock parsing
      if(text.toLowerCase().includes("add")) {
          setTimeout(() => {
              setManualExpense("");
              toast({
                  title: "Expense Logged",
                  description: "₹200 for Lunch added to Food category.",
                  variant: "default"
              })
          }, 1500);
      }
  }

  return (
    <>
      <Card className="h-full border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  {t('add_expense')}
                  <Badge variant="outline" className="ml-auto font-normal text-xs">AI Powered</Badge>
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              {/* Voice/Manual Input */}
              <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Speak or type expense</Label>
                  <div className="flex gap-2">
                      <SpeechInput 
                          value={manualExpense}
                          onChange={(e) => setManualExpense(e.target.value)}
                          onSpeechInput={handleVoiceExpense}
                          placeholder={t('speak_expense')}
                          className="flex-1"
                      />
                      <Button size="icon" onClick={() => handleVoiceExpense(manualExpense)}>
                          <Plus className="w-4 h-4" />
                      </Button>
                  </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or upload statement</span>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="border-dashed border-2 border-border/60 rounded-lg bg-secondary/10 hover:bg-secondary/30 transition-colors cursor-pointer relative overflow-hidden p-6 text-center group">
                <input 
                    type="file" 
                    accept=".pdf,.png,.jpg,.jpeg,.csv"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    disabled={isAnalyzing}
                />
                {isAnalyzing ? (
                    <div className="flex flex-col items-center py-2">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                    <p className="font-medium text-primary text-sm">{t('ai_analysis')}</p>
                    </div>
                ) : (
                    <div className="group-hover:scale-105 transition-transform duration-200">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 mx-auto text-primary">
                        <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">{t('upload')}</p>
                    <p className="text-[10px] text-muted-foreground">PDF, JPG, CSV</p>
                    </div>
                )}
              </div>
          </CardContent>
      </Card>

      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('select_category')}</DialogTitle>
            <DialogDescription>
              AI found 15 transactions in {uploadedFile}. Confirm the primary category for bulk import.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-3 bg-secondary/30 rounded border text-sm">
                <div className="flex justify-between mb-1">
                    <span>Netflix</span>
                    <span className="font-bold">-₹649</span>
                </div>
                <div className="flex justify-between">
                    <span>Uber Ride</span>
                    <span className="font-bold">-₹240</span>
                </div>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business Expenses</SelectItem>
                <SelectItem value="personal">Personal / Home</SelectItem>
                <SelectItem value="travel">Travel & Commute</SelectItem>
                <SelectItem value="utilities">Utilities & Bills</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCategoryConfirm}>{t('confirm')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
