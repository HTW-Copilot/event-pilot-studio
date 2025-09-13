import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_DATA = [
  {
    question: "Do I need to pay fees to host an event?",
    answer: "No! HTW provides venues and basic support at no cost to approved hosts. You're responsible for any special catering or equipment beyond our standard offerings."
  },
  {
    question: "What venues are available?",
    answer: "We have partnerships with tech hubs, coworking spaces, and cultural venues across Honolulu. Popular options include Coworking Hi-Tech, UH Innovation Center, and beachfront pavilions."
  },
  {
    question: "When is the submission deadline?",
    answer: "Event submissions close January 15, 2025. Calendar goes live February 1, 2025. Events run March 10-16, 2025."
  },
  {
    question: "What support do I get as a host?",
    answer: "You'll get marketing templates, co-host matching, event planning guidance, and dedicated HTW support throughout your journey."
  }
];

export const FAQChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm here to help with HTW hosting questions. Ask me anything about venues, deadlines, or requirements!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simple FAQ matching
    const lowerInput = inputValue.toLowerCase();
    let botResponse = "I don't have specific information about that. Please check the detailed guide or contact our team directly.";
    
    const matchedFaq = FAQ_DATA.find(faq => 
      faq.question.toLowerCase().includes(lowerInput) ||
      lowerInput.includes('fee') && faq.question.includes('fees') ||
      lowerInput.includes('venue') && faq.question.includes('venues') ||
      lowerInput.includes('deadline') && faq.question.includes('deadline') ||
      lowerInput.includes('support') && faq.question.includes('support')
    );

    if (matchedFaq) {
      botResponse = matchedFaq.answer;
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-yellow text-secondary hover:bg-yellow/90 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 bg-secondary/95 border-white/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-yellow flex items-center gap-2">
            <Bot className="h-5 w-5" />
            HTW Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full pb-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-yellow text-secondary' : 'bg-white/20 text-white'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-xl ${
                  message.sender === 'user' 
                    ? 'bg-yellow text-secondary' 
                    : 'bg-white/10 text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about hosting at HTW..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button onClick={handleSendMessage} size="sm" className="bg-yellow text-secondary hover:bg-yellow/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};