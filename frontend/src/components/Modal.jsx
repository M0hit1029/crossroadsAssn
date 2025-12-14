import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-[1000] p-5 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] max-w-[600px] w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-900">
          <h2 className="m-0 text-2xl font-semibold text-white">{title}</h2>
          <button 
            className="bg-white/20 border-none text-white cursor-pointer p-1 rounded-md transition-all duration-200 flex items-center justify-center text-center text-3xl leading-none hover:bg-white/30 hover:rotate-90 active:rotate-90 active:scale-95" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-7 overflow-y-auto modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
