import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Shield, User, Globe, Moon, Sun, Briefcase, CreditCard, HelpCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { setLanguage, current } = useLanguage();
  const [gigWorkerMode, setGigWorkerMode] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and app settings.</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize how the app looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Appearance</Label>
                    <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'ghost'} 
                      size="sm" 
                      onClick={() => setTheme('light')}
                      className="h-8 w-8 p-0"
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'ghost'} 
                      size="sm" 
                      onClick={() => setTheme('dark')}
                      className="h-8 w-8 p-0"
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Language</Label>
                    <p className="text-sm text-muted-foreground">Select your preferred language.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <select 
                      className="bg-transparent text-sm font-medium outline-none cursor-pointer"
                      value={current}
                      onChange={(e) => setLanguage(e.target.value as any)}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Gig Worker Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable specialized tools for freelancers.</p>
                  </div>
                  <Switch checked={gigWorkerMode} onCheckedChange={setGigWorkerMode} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Avatar className="h-20 w-20 cursor-pointer border-2 border-border group-hover:border-primary transition-colors">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                         <span className="text-white text-xs font-medium">Change</span>
                    </div>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={() => toast({ title: "Avatar Updated", description: "Your profile picture has been updated." })}/>
                  </div>
                  <div className="space-y-1">
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-xs text-muted-foreground">Click to upload new image</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Morgan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="alex.morgan@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Biometric Login</Label>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face ID.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" className="mt-2" />
                  <Input type="password" placeholder="Confirm New Password" className="mt-2" />
                </div>
                <Button onClick={handleSave}>Update Security</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what you want to be notified about.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Bill Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get alerted before due dates.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify when exceeding budget limits.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Smart Insights</Label>
                    <p className="text-sm text-muted-foreground">Receive AI-powered financial tips.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
