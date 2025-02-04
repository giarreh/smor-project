import { useState, useEffect } from 'react';
import './AIChat.css';
import TypingEffect from 'react-typing-effect'; 


interface Message {
  sender: string;
  content: string;
  timestamp: string; 
  isGenerating?: boolean;
}

export default function AIChat() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString(); // Format the current date
    setDate(currentDate);
  }, []);

  const [firstResponseDone, setFirstResponseDone] = useState(false);

  const handleSend = () => {
    if (input.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString();

    const userMessage: Message = { sender: 'You', content: input, timestamp };

    setMessages(prevMessages => [
      ...prevMessages,
      userMessage
    ]);

    // Step 1: Handle the thinking message only if it's the first response
    if (!firstResponseDone) {
      setTimeout(() => {
        const aiGeneratingTimestamp = new Date().toLocaleTimeString();
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: 'AI',
            content: ' Hmm... I’m just a block of butter, how can I be an AI? How can I respond to this person’s message? Oh my God, what should I do... I probably don’t make any sound, I’m just butter, right? Maybe if I jump into a scorching hot frying pan, I can make some noise. *Pling* Aha!',
            timestamp: aiGeneratingTimestamp,
            isGenerating: true,
          }
        ]);

        // Step 2: Wait before showing AI's first response
        setTimeout(() => {
          const aiResponseTimestamp = new Date().toLocaleTimeString(); 
          setMessages(prevMessages => [
            ...prevMessages.slice(0, -1), // Remove the "thinking" message
            { sender: 'AI', content: `*tssss...*`, timestamp: aiResponseTimestamp }
          ]);

          // Step 3: Set the first response flag to true
          setFirstResponseDone(true);
        }, 19000); // Delay before the first AI response

      }, 2000); // Delay before showing the generating message after the user message
    } else {
      // For subsequent responses, show *tssss...* immediately without the thinking message
      setTimeout(() => {
        const aiSubsequentResponseTimestamp = new Date().toLocaleTimeString();
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'AI', content: `*tssss...*`, timestamp: aiSubsequentResponseTimestamp }
        ]);
      }, 2000);
    }

    setInput('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <strong>SmørAI is online</strong>
        </div>
      </div>
      <div className="chat-messages">
        <div className='date'>{date}</div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'AI' ? 'ai' : 'you'} ${msg.isGenerating ? 'generating' : ''}`}
          >
            <strong>{msg.sender}: </strong> 
            {msg.isGenerating ? (
              <TypingEffect
                text={msg.content}
                speed={50}
                typingDelay={100}
                eraseSpeed={0}
              />
            ) : (
              msg.content
            )}
            <div className="timestamp">({msg.timestamp})</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="..."
        />
        <button className="chat-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
