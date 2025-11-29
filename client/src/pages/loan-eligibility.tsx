import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2, Upload, ShieldCheck, AlertCircle, TrendingUp, Building2, FileCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

export default function LoanEligibilityPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateEMI = () => {
    const r = 10.5 / 12 / 100; // 10.5% annual rate
    const n = tenure;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, 'pending' | 'verified' | null>>({});

  const handleUpload = (docName: string) => {
    // Simulating file pick
    setUploadedDocs(prev => ({ ...prev, [docName]: 'pending' }));
    
    toast({
      title: "Uploading Document",
      description: `Analyzing ${docName}...`,
    });

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setUploadedDocs(prev => ({ ...prev, [docName]: 'verified' }));
      toast({
        title: "Document Verified",
        description: `${docName} has been successfully verified by AI.`,
        variant: "default",
      });
    }, 2500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Eligibility & Planner</h1>
          <p className="text-muted-foreground">Check your eligibility and find the best loan offers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>Estimate your monthly payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Loan Amount</Label>
                    <span className="font-bold text-primary">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[loanAmount]} 
                    min={50000} 
                    max={5000000} 
                    step={10000} 
                    onValueChange={(v) => setLoanAmount(v[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹50k</span>
                    <span>₹50L</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Tenure (Months)</Label>
                    <span className="font-bold text-primary">{tenure} Months</span>
                  </div>
                  <Slider 
                    value={[tenure]} 
                    min={6} 
                    max={60} 
                    step={6} 
                    onValueChange={(v) => setTenure(v[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>6 Months</span>
                    <span>5 Years</span>
                  </div>
                </div>

                <div className="bg-secondary/30 p-6 rounded-xl border border-border/50 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated EMI</p>
                    <h3 className="text-3xl font-bold">₹{calculateEMI().toLocaleString()}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                    <p className="font-bold text-green-600">10.5% p.a.</p>
                  </div>
                  <Button size="lg">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Upload these to increase approval chances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Bank Statement (Last 6 months)', 'Salary Slips (Last 3 months)', 'ID Proof (Aadhar/PAN)', 'Address Proof'].map((doc, i) => (
                    <div 
                        key={i} 
                        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden ${
                            uploadedDocs[doc] === 'verified' 
                                ? 'border-green-500/50 bg-green-500/5' 
                                : uploadedDocs[doc] === 'pending'
                                    ? 'border-blue-500/50 bg-blue-500/5 animate-pulse'
                                    : 'border-border hover:bg-secondary/20'
                        }`} 
                        onClick={() => !uploadedDocs[doc] && handleUpload(doc)}
                    >
                      {uploadedDocs[doc] === 'verified' ? (
                          <>
                            <div className="absolute top-2 right-2 text-green-500"><CheckCircle2 className="w-4 h-4" /></div>
                            <FileCheck className="w-8 h-8 text-green-500 mb-2" />
                            <p className="font-medium text-sm text-green-600">Verified</p>
                          </>
                      ) : uploadedDocs[doc] === 'pending' ? (
                          <>
                             <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-2" />
                             <p className="font-medium text-sm text-blue-600">Analyzing...</p>
                          </>
                      ) : (
                          <>
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="font-medium text-sm">{doc}</p>
                            <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                          </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Credit Score & Eligibility */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" /> Credit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="relative w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                  {/* Simple CSS Gauge Representation */}
                  <div className="absolute inset-0 rounded-full border-[12px] border-slate-700 border-b-transparent rotate-[45deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[12px] border-green-500 border-l-transparent border-b-transparent border-r-transparent rotate-[45deg]"></div>
                  <div className="text-center">
                    <span className="text-4xl font-bold block">785</span>
                    <span className="text-xs text-green-400 font-medium">Excellent</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-4">Your credit score is in the top 15% of users. You qualify for preferential rates.</p>
                <div className="grid grid-cols-2 gap-2 text-left text-sm">
                   <div className="bg-white/10 p-2 rounded">
                      <p className="text-[10px] text-slate-400">On-Time Payments</p>
                      <p className="font-semibold">100%</p>
                   </div>
                   <div className="bg-white/10 p-2 rounded">
                      <p className="text-[10px] text-slate-400">Credit Utilization</p>
                      <p className="font-semibold">12%</p>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Consolidate Credit Card Debt</p>
                    <p className="text-xs text-muted-foreground">You could save ₹4,500/mo by moving your card balance to a personal loan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pre-approved for Home Loan</p>
                    <p className="text-xs text-muted-foreground">Based on your income growth, you are now eligible for up to ₹75 Lakhs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Bank Offers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">HDFC</div>
                            <div>
                                <p className="font-bold text-sm">Personal Loan</p>
                                <p className="text-xs text-muted-foreground">@ 10.25% p.a.</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-xs">ICICI</div>
                            <div>
                                <p className="font-bold text-sm">Gold Loan</p>
                                <p className="text-xs text-muted-foreground">@ 8.50% p.a.</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
