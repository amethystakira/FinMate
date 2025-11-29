import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SpeechInput } from "@/components/ui/speech-input";
import { Send, Bot, User, Plus, MessageSquare, Building2, Phone, Info, Trash2, TrendingUp, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: React.ReactNode; 
  timestamp: Date;
}

interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
  date: Date;
}

export default function ChatPage() {
  const { t, current: currentLang } = useLanguage();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Mock History
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 1,
      title: "Investment Advice",
      date: new Date(Date.now() - 86400000),
      messages: [
        { id: 1, role: 'user', content: "What are good mutual funds?", timestamp: new Date() },
        { id: 2, role: 'assistant', content: "For long term growth, index funds are reliable. Consider HDFC Index Fund or SBI Nifty 50.", timestamp: new Date() }
      ]
    },
    {
      id: 2,
      title: "Home Loan Rates",
      date: new Date(Date.now() - 172800000),
      messages: [
        { id: 1, role: 'user', content: "Best home loan rates?", timestamp: new Date() },
        { id: 2, role: 'assistant', content: "Currently, SBI and HDFC offer competitive rates starting at 8.4% p.a.", timestamp: new Date() }
      ]
    }
  ]);

  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Namaste! I'm your FinCoach. I can help you plan investments, check loan eligibility, or find the best bank for your needs. How can I help you today?", 
      timestamp: new Date() 
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setCurrentMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setCurrentMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): React.ReactNode => {
    const q = query.toLowerCase();
    
    // Multilingual Greetings
    const greetings: Record<string, string> = {
        'hi': "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
        'es': "¡Hola! ¿Cómo puedo ayudarte hoy?",
        'fr': "Bonjour! Comment puis-je vous aider?",
        'en': "Hello! How can I assist you today?"
    };
    
    if (q.includes("hello") || q.includes("hi") || q.includes("namaste")) {
        return greetings[currentLang] || greetings['en'];
    }

    // General Conversation (Not just investment)
    if (q.includes("weather") || q.includes("news")) {
        return currentLang === 'hi' 
            ? "माफ़ कीजिये, मैं केवल वित्तीय सलाह दे सकता हूँ, लेकिन बाज़ार आज ऊपर है!" 
            : "I focus on financial advice, but the market outlook is sunny today!";
    }

    if (q.includes("joke")) {
         return currentLang === 'hi'
            ? "पैसे पेड़ पर नहीं उगते... जब तक कि आपने 'Money Plant' न लगाया हो! 😄"
            : "Why did the banker break up with the calculator? She felt he was just using her! 😄";
    }

    if (q.includes("invest") || q.includes("stock") || q.includes("fund") || q.includes("sip")) {
      return (
        <div className="space-y-3">
          <p>{currentLang === 'hi' ? "यहाँ कुछ बेहतरीन निवेश योजनाएँ हैं:" : "Here are some excellent investment plans tailored for the Indian market:"}</p>
          
          <div className="grid gap-3 mt-2">
            <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                <TrendingUp className="w-5 h-5" /> SBI Nifty 50 Index Fund
              </div>
              <p className="text-sm mb-1"><strong>Returns:</strong> ~12-14% p.a. (Historical)</p>
              <p className="text-xs text-muted-foreground mb-2">Low expense ratio. Best for long-term wealth creation (5+ years).</p>
              <div className="flex gap-2">
                 <a href="#" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Start SIP</a>
                 <span className="text-xs text-slate-500 flex items-center"><Info className="w-3 h-3 mr-1"/> Min ₹500</span>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-2 font-bold text-green-600 mb-2">
                <ShieldCheck className="w-5 h-5" /> PPF (Public Provident Fund)
              </div>
              <p className="text-sm mb-1"><strong>Returns:</strong> 7.1% p.a. (Govt Backed)</p>
              <p className="text-xs text-muted-foreground mb-2">Tax-free returns under 80C. Lock-in period of 15 years.</p>
              <div className="flex gap-2">
                 <span className="text-xs text-slate-500 flex items-center"><Building2 className="w-3 h-3 mr-1"/> Available at SBI, Post Office, HDFC</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2">I can also help you open a Demat account or connect you with a bank representative.</p>
        </div>
      );
    }

    if (q.includes("contact") || q.includes("support") || q.includes("bank")) {
      return (
        <div className="space-y-2">
          <p>Here are the official contact details for major banks:</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between p-2 bg-secondary/30 rounded border">
                <span className="font-medium">SBI Support</span>
                <a href="tel:18004253800" className="text-blue-600 text-sm flex items-center"><Phone className="w-3 h-3 mr-1"/> 1800 425 3800</a>
            </div>
            <div className="flex items-center justify-between p-2 bg-secondary/30 rounded border">
                <span className="font-medium">HDFC Bank</span>
                <a href="tel:18002026161" className="text-blue-600 text-sm flex items-center"><Phone className="w-3 h-3 mr-1"/> 1800 202 6161</a>
            </div>
            <div className="flex items-center justify-between p-2 bg-secondary/30 rounded border">
                <span className="font-medium">ICICI Bank</span>
                <a href="tel:18601207777" className="text-blue-600 text-sm flex items-center"><Phone className="w-3 h-3 mr-1"/> 1860 120 7777</a>
            </div>
          </div>
        </div>
      );
    }
    
    if (q.includes("loan")) {
        return "Based on your profile, you have high eligibility for a Personal Loan up to ₹5 Lakhs at 10.5% interest from HDFC Bank. Would you like to apply?";
    }

    return "I understand. Could you clarify if you want to know about Investment Plans (SIP/Mutual Funds), Loan Eligibility, or Saving Strategies? I can provide detailed bank comparisons.";
  };

  const startNewChat = () => {
    if (currentMessages.length > 1 && currentMessages[1]?.content) {
       const newSession: ChatSession = {
         id: Date.now(),
         title: typeof currentMessages[1].content === 'string' ? currentMessages[1].content.slice(0, 20) + "..." : "New Chat",
         messages: currentMessages,
         date: new Date()
       };
       setSessions([newSession, ...sessions]);
    }
    setCurrentMessages([{ 
      id: Date.now(), 
      role: 'assistant', 
      content: "Namaste! I'm your FinCoach. I can help you plan investments, check loan eligibility, or find the best bank for your needs. How can I help you today?", 
      timestamp: new Date() 
    }]);
    setCurrentSessionId(null);
  };

  const loadSession = (session: ChatSession) => {
    // Save current if needed
    if (currentSessionId === null && currentMessages.length > 1 && currentMessages[1]?.content) {
       const newSession: ChatSession = {
         id: Date.now(),
         title: typeof currentMessages[1].content === 'string' ? currentMessages[1].content.slice(0, 20) + "..." : "New Chat",
         messages: currentMessages,
         date: new Date()
       };
       setSessions(prev => [newSession, ...prev]);
    }
    setCurrentMessages(session.messages);
    setCurrentSessionId(session.id);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        {/* History Sidebar */}
        <Card className="w-72 hidden md:flex flex-col border-border/50 shadow-sm h-full bg-card/50 backdrop-blur-sm">
          <CardHeader className="p-4 border-b border-border/50">
            <Button onClick={startNewChat} className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none border-0">
              <Plus className="w-4 h-4" /> {t('new_chat')}
            </Button>
          </CardHeader>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('history')}</p>
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => loadSession(session)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm truncate transition-all flex items-center gap-3 ${
                    currentSessionId === session.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-70" />
                  <div className="flex-1 truncate">
                    <span className="truncate block">{session.title}</span>
                    <span className="text-[10px] opacity-60">{session.date.toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col border-border/50 shadow-lg bg-card/80 backdrop-blur-sm h-full overflow-hidden">
          <CardHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between bg-card/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{t('chat')}</CardTitle>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online
                </p>
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6 max-w-3xl mx-auto">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <Avatar className="w-8 h-8 border border-border shadow-sm mt-1">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl px-5 py-3.5 max-w-[85%] shadow-sm text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-white dark:bg-slate-800 border border-border/50 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                    <span className={`text-[10px] opacity-50 mt-2 block text-right ${msg.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <Avatar className="w-8 h-8 border border-border shadow-sm mt-1">
                       <AvatarFallback className="bg-slate-200 text-slate-700"><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                   <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <CardFooter className="p-4 border-t border-border/50 bg-card/50">
            <form 
              className="flex w-full gap-3 max-w-3xl mx-auto relative items-center"
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
              <SpeechInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSpeechInput={(txt) => setInput(txt)}
                placeholder={t('chat_placeholder')}
                className="flex-1 bg-background border-border focus:ring-primary/20 pr-12 shadow-sm h-11 rounded-full"
                wrapperClassName="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="h-11 w-11 shrink-0 shadow-md rounded-full bg-primary hover:bg-primary/90">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
