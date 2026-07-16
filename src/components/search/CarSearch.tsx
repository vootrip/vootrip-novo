import { useEffect, useRef } from 'react';

export function CarSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Widget de Carros Travelpayouts - cores ajustadas para Vootrip
    const script = document.createElement('script');
    script.src = 'https://tpwgt.com/content?trs=549322&shmarker=749258.749258&locale=pt_BR&powered_by=false&border_radius=12&plain=true&show_logo=true&color_background=%23ffffff&color_button=%23FF6B35&color_text=%231A1A2E&color_input_text=%231A1A2E&color_button_text=%23ffffff&promo_id=4480&campaign_id=10';
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
    <div data-ev-id="ev_f4fcb7a99e" className="min-h-[200px]">
      <div data-ev-id="ev_6cf6f5998a" ref={widgetRef} className="car-widget" />
    </div>);

}