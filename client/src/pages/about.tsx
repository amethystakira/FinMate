import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Mail, Globe, Shield, Users, Zap } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <Badge variant="secondary" className="mb-4">Version 2.0.1</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('app_name')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering your financial future with AI-driven insights, secure banking, and personalized coaching.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-none shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Smart Automation</h3>
              <p className="text-sm text-muted-foreground">We automate tracking expenses and paying bills so you can focus on growing your wealth.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-sm text-muted-foreground">Your data is protected with state-of-the-art encryption and compliance standards.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-none shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Community First</h3>
              <p className="text-sm text-muted-foreground">Join thousands of users achieving their financial goals together with Finmate.</p>
            </CardContent>
          </Card>
        </div>

        {/* Team/Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Have questions or feedback? We'd love to hear from you. Reach out to our support team or follow us on social media.
            </p>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" /> support@finmate.com
              </Button>
              <Button variant="outline" className="gap-2">
                <Twitter className="w-4 h-4" /> @finmate_app
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground pb-8">
          <p>© 2025 Finmate Inc. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>

      </div>
    </Layout>
  );
}
