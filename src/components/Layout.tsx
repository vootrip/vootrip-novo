import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  showHero?: boolean;
}

export function Layout({ children, showHero = false }: LayoutProps) {
  return (
    <div data-ev-id="ev_002c4f35c6" className="min-h-screen flex flex-col bg-background">
      <Header transparent={showHero} />
      <main data-ev-id="ev_be098fbb33" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>);

}