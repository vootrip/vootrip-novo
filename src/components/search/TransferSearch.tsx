import { useEffect, useRef } from 'react';

export function TransferSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Widget de Traslados Travelpayouts - código original
    const script = document.createElement('script');
    script.src = 'https://tpwgt.com/content?currency=USD&trs=549322&shmarker=749258.749258&locale=pt&from=&to=&country=&powered_by=true&height=&wtype=true&transfers_limit=10&bg_color=%23f5f5f5&button_color=%23239a54&button_font_color=%23ffffff&button_hover_color=%230274da&border_color=%23f9ac1a&input_font_color=%23c8ced4&input_bg_color=%23ffffff&input_label_color=%23c8ced4&icon_bg_color=%23ffffff&icon_arrow_color=%236c7c8c&icon_bg_color_mobile=%23f9ac1a&icon_arrow_color_mobile=%23ffffff&autocomplete_font_color=%23373f47&autocomplete_bg_color=%23ffffff&autocomplete_font_color_active=%23ffffff&autocomplete_bg_color_active=%23239a54&loader_color=%23f9ac1a&empty_color=%23373f47&info_bg_color=%23fff0cc&info_icon_color=%234a4a4a&info_caption_color=%234a4a4a&class_background=%23ffffff&class_font_color=%23373f47&class_header_color=%236c7c8c&class_button_background=%2326a65b&class_button_font_color=%23ffffff&class_button_background_hover=%230274da&class_comment_background=%23bfc0c4&class_comment_font=%23bfc0c4&more_background=&more_background_hover=&more_font_color=%230267c1&notification_background=%23f6f1ec&notification_border_color=%23e37f17&notification_color=%23373f47&transfer_background=%23f6f7f8&transfer_background_hover=%23f6f7f8&transfer_font_color=%23373f47&campaign_id=1&promo_id=2949';
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
    <div data-ev-id="ev_610428bee2" className="min-h-[300px]">
      <div data-ev-id="ev_3466e48b5a" ref={widgetRef} className="transfer-widget" />
    </div>);

}