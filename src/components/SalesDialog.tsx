import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { Tooltip } from '@mui/material';

interface SalesDialogProps {
  onSubmit: (name: string, email: string, phone: string) => void;
  onClose: () => void;
}

const SalesDialog: React.FC<SalesDialogProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Allow UK formats: +44 7XXX XXX XXX, 07XXX XXX XXX, 07XXX-XXX-XXX
    const phoneRegex = /^(\+44\s?7|07)[0-9]{3}(\s|\-)?[0-9]{3}(\s|\-)?[0-9]{3}$/;
    return phoneRegex.test(phone.trim());
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid UK mobile number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      onSubmit(name, email, phone); // Call the onSubmit prop with form data
      setIsSubmitted(true); // Show confirmation message
      
      // After 4 seconds, hide confirmation and close dialog
      setTimeout(() => {
        setIsSubmitted(false);
        onClose(); // Close SalesDialog to show ChatDialog
      }, 4000);
    }
  };

  return (
    <div className="bg-white flex flex-col rounded-lg shadow-lg w-[448px] h-[495px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#008080] text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/Arto-Logo-Reverse.svg" alt="Arto" className="h-14" />
          <Tooltip 
            title="These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading."
            arrow
            placement="bottom"
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '8px 12px',
                maxWidth: '280px',
                borderRadius: '4px'
              },
              '& .MuiTooltip-arrow': {
                color: 'rgba(0, 0, 0, 0.9)'
              }
            }}
          >
            <button 
              className="p-1 rounded-full hover:bg-[#006666] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Information about AI Assistant"
              tabIndex={2}
            >
              <Info className="h-4 w-4 text-white" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#9CA3AF #f3f4f6',
          maxHeight: 'calc(495px - 72px - 24px)' // 495px total - header height - padding
        }}>
        <div className="w-full flex flex-col">
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center pt-16 p-8 space-y-4">
            <div className="animate-[scale-up_0.5s_ease-out,ease-in-out_0.5s]">
              <CheckCircle2 
                className="w-16 h-16 text-teal-600 animate-[draw-check_1s_ease-out_forwards]"
                strokeWidth={2.5}
                aria-label="Success check mark"
              />
            </div>
              <h6 className=" mb-4 text-gray-700 text-lg font-semibold">
                Thank you for your interest!
              </h6>
              <p className="text-gray-700">
                A representative will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <h6 className="mt-2 mb-6 text-gray-700 text-lg font-semibold">
                Talk to our sales team
              </h6>
              
              <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`block w-full rounded-md border ${nameError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                placeholder="Your name"
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-md border ${emailError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                placeholder="you@example.com"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`block w-full rounded-md border ${phoneError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                placeholder="Your phone number"
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#008080] hover:bg-[#006666] focus-visible:outline-[#008080]"
              >
                Submit
              </button>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesDialog;
