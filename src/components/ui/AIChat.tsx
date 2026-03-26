"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Payal's AI assistant. Ask me about her experience at Sosotech or her 3D projects!" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Mock AI Response (Replace this with your API call later)
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "That's a great question! Based on Payal's resume, she specializes in React and Three.js, and she recently built a Gamified Learning Platform." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 h-96 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl rounded-2xl flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-cyan-500/10">
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <Bot size={18} />
                <span>Payal's AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} className="text-slate-400" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-800 border-none rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
              />
              <button onClick={handleSend} className="bg-cyan-500 p-2 rounded-lg text-black hover:bg-cyan-400 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cyan-500 p-4 rounded-full text-black shadow-lg shadow-cyan-500/20"
      >
        <MessageSquare />
      </motion.button>
    </div>
  );
}