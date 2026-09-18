import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ScrollSpyContextType {
  activeSection: string;
  scrollTo: (id: string) => void;
}

const ScrollSpyContext = createContext<ScrollSpyContextType>({
  activeSection: '',
  scrollTo: () => {},
});

export const useScrollSpy = () => useContext(ScrollSpyContext);

export const ScrollSpyProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['landing', 'upload', 'results'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on sticky header height (~80px)
          if (rect.top <= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by header height
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ScrollSpyContext.Provider value={{ activeSection, scrollTo }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
