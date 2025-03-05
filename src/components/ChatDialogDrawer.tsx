import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import FeedbackDrawer from './FeedbackDrawer';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../contexts/ChatContext';
import ChatHeader from './ChatHeader';
import { getAssetPath } from '../utils/assetPath';

const ChatDialog: React.FC = () => {
  const { isTyping } = useChat();

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Handle dialog close
      console.log('Dialog close requested');
      handleClose();
    }
  };

  const handleClose = () => {
    console.log('Dialog close requested from close button');
    // Add your close dialog logic here
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div 
        className="w-[378px] md:w-[448px] bg-white rounded-lg shadow-xl flex flex-col h-[600px] relative"
        role="document"
      >
        {/* Header */}
        <ChatHeader 
          logoSrc={getAssetPath('Arto-Logo-Reverse.svg')} 
          logoAlt="Arto"
          tooltipText="These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading."
          onClose={handleClose}
        />

        {/* Message Area */}
        <main 
          className="flex-1 overflow-y-auto"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          <MessageList />
          {isTyping && <TypingIndicator />}
        </main>

        {/* Input Area */}
        <footer role="contentinfo">
          <ChatInput />
        </footer>

        {/* Feedback Drawer */}
        <FeedbackDrawer />
      </div>
    </div>
  );
};

export default ChatDialog;