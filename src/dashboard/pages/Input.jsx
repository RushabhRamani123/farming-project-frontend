import { forwardRef, useEffect, useState } from 'react';
import { Search, Send, Mic, MicOff, Loader } from 'lucide-react';
import PropTypes from 'prop-types';

const EnhancedSearchInput = forwardRef(({ 
  input = '', 
  setInput, 
  handleSubmit,
  placeholder = "Ask about crops, farming techniques, or any agricultural queries...",
  className = "",
}, ref) => {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recognition,setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [displayValue,setDisplayed]=useState(''); 
  const startVoiceInput = () => {
    setError(null);
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice input is not supported in your browser');
      return;
    }

    try {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;  // Enable continuous recording
      newRecognition.interimResults = true;  // Get results as user speaks
      newRecognition.lang = 'en-US';

      newRecognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      newRecognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';

        // Collect all results, both interim and final
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            currentInterimTranscript += transcript;
          }
        }

        // Update final transcript
        if (finalTranscript) {
          const newInput = ((input || '') + ' ' + finalTranscript).trim();
          setInput(newInput);
        }

        // Update interim transcript
        setInterimTranscript(currentInterimTranscript);
      };

      newRecognition.onerror = (event) => {
        setError(`Voice input error: ${event.error}`);
        stopVoiceInput();
      };

      newRecognition.onend = () => {
        // Only reset isListening if we're not intentionally stopping
        if (isListening) {
          newRecognition.start();  // Restart if it ends unintentionally
        }
      };

      newRecognition.start();
      setRecognition(newRecognition);
    } catch (err) {
      setError('Failed to start voice input');
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!input.trim()) {
        if(displayValue!=0)
            handleSubmit(displayValue);
      setError('Please enter some text before submitting');
      return;
    }

    setIsLoading(true);
    try {
      await handleSubmit(e);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting');
    } finally {
      setIsLoading(false);
    }
  };
useEffect(()=>{
    if(interimTranscript){
        setDisplayed(`${input || ''} ${interimTranscript}`)
    }
},[interimTranscript,input])

  return (
    <div className={`w-full bg-gradient-to-b from-green-50 to-white border-t shadow-sm ${className}`}>
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={onSubmit} className="relative">
          <div className="relative group flex items-center">
            <div className="absolute left-4 text-green-600 pointer-events-none">
              <Search size={20} className="group-focus-within:text-green-700" />
            </div>
            
            <input
              ref={ref}
              type="text"
              className={`w-full pl-12 pr-24 py-3.5 rounded-2xl border 
                       ${error ? 'border-red-200 focus:ring-red-500/20 focus:border-red-500' 
                              : 'border-green-100 focus:ring-green-500/20 focus:border-green-500'}
                       bg-white shadow-sm transition-all duration-200 ease-in-out
                       placeholder:text-gray-400 text-gray-700
                       focus:outline-none focus:ring-2
                       hover:border-green-200 hover:shadow-md
                       disabled:bg-gray-50 disabled:cursor-not-allowed`}
              placeholder={placeholder}
              value={displayValue}
              onChange={(e) => {
                setError(null);
                setInput(e.target.value);
              }}
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? "input-error" : undefined}
            />

            <div className="absolute right-2 flex items-center space-x-1">
              <button
                type="button"
                onClick={handleVoiceInput}
                disabled={isLoading}
                className={`p-2 rounded-full transition-all duration-200
                          ${isListening 
                            ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                {isListening ? (
                  <MicOff size={20} className="animate-pulse" />
                ) : (
                  <Mic size={20} />
                )}
              </button>

              <button
                type="submit"
                disabled={!displayValue.trim() || isLoading}
                className={`p-2 rounded-full transition-all duration-200
                          ${displayValue.trim() && !isLoading
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                          disabled:opacity-50`}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <Send size={20} className={displayValue.trim() ? 'transform rotate-45' : ''} />
                )}
              </button>
            </div>

            <div className={`absolute inset-0 rounded-2xl pointer-events-none
                          ring-1 ring-inset ${error ? 'ring-red-100/50' : 'ring-green-100/50'}`} 
            />
          </div>

          <div className="flex justify-between mt-2 px-4">
            {error ? (
              <p id="input-error" className="text-xs text-red-500 animate-fade-in">
                {error}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Try asking about sustainable farming practices, crop diseases, or soil management
              </p>
            )}
            {isListening && (
              <p className="text-xs text-red-500 animate-pulse">
                Listening... Click the mic icon to stop recording
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});

EnhancedSearchInput.displayName = 'EnhancedSearchInput';

EnhancedSearchInput.propTypes = {
  input: PropTypes.string,
  setInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

EnhancedSearchInput.defaultProps = {
  input: '',
  placeholder: "Ask about crops, farming techniques, or any agricultural queries...",
  className: '',
};

export default EnhancedSearchInput;