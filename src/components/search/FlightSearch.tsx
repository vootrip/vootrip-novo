import { useEffect, useRef } from 'react';

export function FlightSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Widget de Voos com Destinos Populares - Travelpayouts
    const script = document.createElement('script');
    script.src = 'https://tpwgt.com/content?currency=usd&trs=549322&shmarker=749258.749258&locale=pt_br&default_origin=GRU&stops=any&show_hotels=true&powered_by=true&border_radius=1&plain=false&color_button=%2300A908f2&color_button_text=%23ffffff&promo_id=3414&campaign_id=111';
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
    <div data-ev-id="ev_6f6344e9a9" className="min-h-[300px]">
      <div data-ev-id="ev_f892782649" ref={widgetRef} className="flight-widget" />
    </div>);

}