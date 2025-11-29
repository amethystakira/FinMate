import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CreditCard, Wallet, ShieldCheck, ArrowRight, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function LinkBankPage() {
  const { t } = useLanguage();
  const [isLinking, setIsLinking] = useState(false);
  const [step, setStep] = useState(1);

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setStep(2);
      toast({
        title: "Account Linked",
        description: "Your bank account has been successfully linked securely.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t('link_bank')}</h1>
          <p className="text-muted-foreground">Securely connect your financial accounts to Finmate</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          {step === 1 ? (
            <>
              <CardHeader>
                <CardTitle>Add New Account</CardTitle>
                <CardDescription>Select your bank or UPI provider</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLink} className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'UPI'].map((bank) => (
                      <div key={bank} className="border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 hover:border-primary transition-all group">
                        <Building2 className="w-8 h-8 mb-2 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-medium">{bank}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Customer ID / UPI ID</Label>
                    <Input placeholder="e.g. 123456789 or name@upi" required />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your data is encrypted with 256-bit SSL. We only have read-access to your transaction history.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLinking}>
                    {isLinking ? "Verifying Credentials..." : "Link Account Securely"}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Successfully Linked!</h2>
              <p className="text-muted-foreground mb-8">Your State Bank of India account ending in 8892 is now connected.</p>
              <Button onClick={() => setStep(1)} variant="outline" className="gap-2">
                Link Another Account <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
