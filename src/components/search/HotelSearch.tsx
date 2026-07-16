import { useEffect, useRef } from 'react';

export function HotelSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Widget de Hotéis - Travelpayouts
    const script = document.createElement('script');
    script.src = 'https://tpwgt.com/content?currency=brl&trs=549322&shmarker=749258.749258&locale=pt&powered_by=false&limit=4&primary_color=FF6B35&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111';
    script.async = true;
    script.charset = 'utf-8';

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div data-ev-id="ev_408fe90e4f" className="min-h-[250px]">
      <div data-ev-id="ev_21077c9870" ref={widgetRef} className="hotel-widget" />
    </div>);

}