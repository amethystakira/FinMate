import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Link, useLocation } from "wouter";
import { 
  Eye, EyeOff, Loader2, Globe, Lock, Phone, User, 
  Building2, Briefcase, MapPin, IndianRupee, CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import generatedImage from '@assets/generated_images/modern_abstract_blue_fintech_background_with_geometric_shapes_and_data_flow_lines.png';

export default function AuthPage() {
  const { t, current, setLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    age: '',
    city: '',
    gender: '',
    work: '',
    salary: '',
    upi: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={generatedImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-900/50"></div>
      </div>

      {/* Language Switcher Absolute Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <Select value={current} onValueChange={(v: any) => setLanguage(v)}>
          <SelectTrigger className="w-[140px] bg-white/10 backdrop-blur-md border-white/20 text-white">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
            <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
            <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
            <SelectItem value="mr">मराठी (Marathi)</SelectItem>
            <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
            <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 py-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-600/40 mb-4 ring-2 ring-white/10">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight font-display">{t('app_name')}</h1>
          <p className="text-slate-400 mt-2 text-lg">{t('login_subtitle')}</p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center text-white">{t('welcome')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">{t('username')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="username" 
                      placeholder="Rahul Kumar" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">{t('phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="+91 98765 43210" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-slate-200">{t('age')}</Label>
                  <Input 
                    id="age" 
                    type="number"
                    placeholder="25" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="gender" className="text-slate-200">{t('gender')}</Label>
                  <Select>
                    <SelectTrigger className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Work & Salary */}
                <div className="space-y-2">
                  <Label htmlFor="work" className="text-slate-200">{t('work')}</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="work" 
                      placeholder="Software Engineer" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="salary" className="text-slate-200">{t('salary')} (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="salary" 
                      type="number"
                      placeholder="50000" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* City */}
                 <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-200">{t('city')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="city" 
                      placeholder="Mumbai" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                 {/* UPI/Bank */}
                 <div className="space-y-2">
                  <Label htmlFor="upi" className="text-slate-200">UPI ID (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="upi" 
                      placeholder="user@upi" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-200">{t('password')}</Label>
                  <Link href="/forgot-password">
                    <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">{t('forgot_pass')}</span>
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-600/25 border-none h-12 font-bold text-base mt-4 rounded-xl transition-all hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('processing')}
                  </>
                ) : (
                  t('login_btn')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
