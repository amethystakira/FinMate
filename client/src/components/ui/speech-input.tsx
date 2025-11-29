import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

interface SpeechInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSpeechInput?: (text: string) => void;
  wrapperClassName?: string;
}

export const SpeechInput = ({ className, wrapperClassName, onSpeechInput, onChange, value, ...props }: SpeechInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onSpeechInput) {
          onSpeechInput(transcript);
        }
        // Simulate synthetic event for standard onChange
        if (onChange) {
          const syntheticEvent = {
            target: { value: transcript }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onSpeechInput, onChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className={cn("relative", wrapperClassName)}>
      <Input 
        {...props} 
        className={cn("pr-12", className)} 
        value={value}
        onChange={onChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent",
          isListening ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-primary"
        )}
        onClick={toggleListening}
        title={isListening ? t('mic_listening') : "Click to speak"}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </Button>
    </div>
  );
};
