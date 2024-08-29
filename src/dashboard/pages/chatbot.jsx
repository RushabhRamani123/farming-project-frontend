import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialMessage = { id: 1, text: "Hello! How can I assist you today?", isBot: true };

const ChatbotUI = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { id: messages.length + 1, text: input, isBot: false };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        console.log('Sending request to API...');
        // const controller = new AbortController();
        // const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('https://nfc-1-kg3l.onrender.com/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: input }),
          // signal: controller.signal
        });

        // clearTimeout(timeoutId);

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error('Error parsing JSON:', e);
          throw new Error('Invalid JSON in response');
        }

        console.log('Parsed data:', data);

        if (data && data.result) {
          const botMessage = { id: messages.length + 2, text: data.result, isBot: true };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          throw new Error('No message in response data');
        }
      } catch (error) {
        console.error('Error:', error);
        let errorMessage = "Sorry, I'm having trouble connecting. Please try again later.";
        if (error.name === 'AbortError') {
          errorMessage = "The request timed out. Please try again.";
        }
        setMessages(prevMessages => [...prevMessages, { id: messages.length + 2, text: errorMessage, isBot: true }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      <ScrollArea className="flex-grow p-6 overflow-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}>
            <div className={`inline-block p-3 rounded-lg ${message.isBot ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} max-w-[80%]`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow mr-2"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotUI;