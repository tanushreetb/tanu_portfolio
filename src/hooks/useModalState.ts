/**
 * useModalState Hook
 * 
 * Custom hook for managing modal state including open/close, scroll locking,
 * and focus management for accessibility.
 * 
 * Requirements: 3.3, 3.4, 3.5, 10.2
 */

import { useEffect, useState, useCallback, useRef } from 'react';

interface UseModalStateOptions {
  onOpen?: () => void;
  onClose?: () => void;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
}

interface UseModalStateReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Hook to manage modal state with accessibility features
 * 
 * @param options - Configuration options for modal behavior
 * @param options.onOpen - Callback function when modal opens
 * @param options.onClose - Callback function when modal closes
 * @param options.closeOnEscape - Whether to close modal on ESC key press
 * @param options.lockScroll - Whether to lock body scroll when modal is open
 * 
 * @returns Object with modal state and control functions
 * 
 * @example
 * const { isOpen, open, close } = useModalState({
 *   closeOnEscape: true,
 *   lockScroll: true,
 *   onClose: () => console.log('Modal closed')
 * });
 * 
 * <button onClick={open}>Open Modal</button>
 * {isOpen && <Modal onClose={close}>Content</Modal>}
 */
export const useModalState = ({
  onOpen,
  onClose,
  closeOnEscape = true,
  lockScroll = true
}: UseModalStateOptions = {}): UseModalStateReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef<number>(0);

  const open = useCallback(() => {
    // Store the currently focused element to restore focus later
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // Store current scroll position
    scrollPosition.current = window.pageYOffset;
    
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    
    // Restore focus to the element that opened the modal
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, close]);

  // Handle scroll locking
  useEffect(() => {
    if (!lockScroll) return;

    if (isOpen) {
      // Lock scroll
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Prevent scroll on iOS
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      // Unlock scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, lockScroll]);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};
