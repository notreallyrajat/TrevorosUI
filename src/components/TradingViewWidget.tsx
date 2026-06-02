import React, { useEffect, useRef, memo } from 'react';

type ChartTheme = 'light' | 'dark';
type Interval = '1' | '5' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M';

// ── Symbol resolution — exhaustive Indian + US market map ─────
export const resolveSymbol = (name: string): string => {
  const map: Record<string, string> = {
    // Indices
    'NIFTY50':           'NSE:NIFTY',
    'NIFTY':             'NSE:NIFTY',
    'BANKNIFTY':         'NSE:BANKNIFTY',
    'NIFTYBANK':         'NSE:BANKNIFTY',
    'SENSEX':            'BSE:SENSEX',
    'FINNIFTY':          'NSE:FINNIFTY',
    // Large-cap NSE
    'HDFCBANK':          'NSE:HDFCBANK',
    'HDFC':              'NSE:HDFCBANK',
    'ICICIBANK':         'NSE:ICICIBANK',
    'ICICI':             'NSE:ICICIBANK',
    'SBIN':              'NSE:SBIN',
    'SBI':               'NSE:SBIN',
    'STATEBANKOFINDIA':  'NSE:SBIN',
    'AXISBANK':          'NSE:AXISBANK',
    'AXIS':              'NSE:AXISBANK',
    'KOTAKBANK':         'NSE:KOTAKBANK',
    'KOTAK':             'NSE:KOTAKBANK',
    'INFY':              'NSE:INFY',
    'INFOSYS':           'NSE:INFY',
    'TCS':               'NSE:TCS',
    'ONGC':              'NSE:ONGC',
    'RELIANCE':          'NSE:RELIANCE',
    'WIPRO':             'NSE:WIPRO',
    'HCLTECH':           'NSE:HCLTECH',
    'HCL':               'NSE:HCLTECH',
    'TATAMOTORS':        'NSE:TATAMOTORS',
    'TATA':              'NSE:TATAMOTORS',
    'TATASTEEL':         'NSE:TATASTEEL',
    'MARUTI':            'NSE:MARUTI',
    'MARUTISUZUKI':      'NSE:MARUTI',
    'SUNPHARMA':         'NSE:SUNPHARMA',
    'BAJFINANCE':        'NSE:BAJFINANCE',
    'BAJAJFINANCE':      'NSE:BAJFINANCE',
    'LT':                'NSE:LT',
    'LARSENTOUBRO':      'NSE:LT',
    'ASIANPAINT':        'NSE:ASIANPAINT',
    'ASIANPAINTS':       'NSE:ASIANPAINT',
    'TITAN':             'NSE:TITAN',
    'ITC':               'NSE:ITC',
    'HINDUNILVR':        'NSE:HINDUNILVR',
    'HUL':               'NSE:HINDUNILVR',
    'BHARTIAIRTEL':      'NSE:BHARTIARTL',
    'AIRTEL':            'NSE:BHARTIARTL',
    'DRREDDY':           'NSE:DRREDDY',
    'DRREDDYS':          'NSE:DRREDDY',
    'CIPLA':             'NSE:CIPLA',
    'DIVISLAB':          'NSE:DIVISLAB',
    'TECHM':             'NSE:TECHM',
    'TECHMAHINDRA':      'NSE:TECHM',
    'NTPC':              'NSE:NTPC',
    'POWERGRID':         'NSE:POWERGRID',
    'COALINDIA':         'NSE:COALINDIA',
    'BPCL':              'NSE:BPCL',
    'VEDL':              'NSE:VEDL',
    'VEDANTA':           'NSE:VEDL',
    'HINDALCO':          'NSE:HINDALCO',
    'JSWSTEEL':          'NSE:JSWSTEEL',
    'ULTRACEMCO':        'NSE:ULTRACEMCO',
    'INDUSINDBK':        'NSE:INDUSINDBK',
    'INDUSIND':          'NSE:INDUSINDBK',
    'EICHERMOT':         'NSE:EICHERMOT',
    'HEROMOTOCO':        'NSE:HEROMOTOCO',
    'BRITANNIA':         'NSE:BRITANNIA',
    'NESTLEIND':         'NSE:NESTLEIND',
    'NESTLE':            'NSE:NESTLEIND',
    'IOC':               'NSE:IOC',
    'IOCL':              'NSE:IOC',
    'APOLLOHOSP':        'NSE:APOLLOHOSP',
    'APOLLO':            'NSE:APOLLOHOSP',
    'ADANIPORTS':        'NSE:ADANIPORTS',
    'ADANI':             'NSE:ADANIPORTS',
    'BAJAJFINSV':        'NSE:BAJAJFINSV',
    'GRASIM':            'NSE:GRASIM',
    'LTIM':              'NSE:LTIM',
    'HDFCLIFE':          'NSE:HDFCLIFE',
    'SBILIFE':           'NSE:SBILIFE',
    'SUZLON':            'NSE:SUZLON',
    'SUZLONENERGY':      'NSE:SUZLON',
    'AEQUS':             'NSE:AEQUS',
    'IEL':               'NSE:IEL',
    // US
    'TSLA':              'NASDAQ:TSLA',
    'AAPL':              'NASDAQ:AAPL',
    'MSFT':              'NASDAQ:MSFT',
    'GOOGL':             'NASDAQ:GOOGL',
    'AMZN':              'NASDAQ:AMZN',
    'META':              'NASDAQ:META',
    'NVDA':              'NASDAQ:NVDA',
    // Volatility
    'VIX':               'CBOE:VIX',
    'VOLATILITY':        'CBOE:VIX',
    'INDIAVIX':          'NSE:INDIAVIX',
  };

  const n1 = name.toUpperCase().replace(/\s+/g, '');          // "HDFCBANK"
  const n2 = name.toUpperCase().replace(/[^A-Z0-9]/g, '');    // strip &, . etc
  const n3 = name.toUpperCase().split(/\s+/)[0];              // first word

  return map[n1] ?? map[n2] ?? map[n3] ?? `NSE:${n1}`;
};

export const TF_TO_INTERVAL: Record<string, Interval> = {
  '1D': 'D', '1W': 'W', '1M': 'M',
  '3M': 'M', '6M': 'M', '1Y': 'W', 'All': 'W',
};

// ── TradingView symbol-overview widget (works without login) ──
// Uses the "Symbol Overview" embed which shows real chart + price
// for any publicly accessible symbol including NSE/BSE stocks.

interface TradingViewWidgetProps {
  symbol?: string;
  interval?: Interval;
  theme?: ChartTheme;
  height?: number | string;
  width?: string;
  showToolbar?: boolean;
  showSideToolbar?: boolean;
  allowSymbolChange?: boolean;
  containerId?: string;
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({
  symbol = 'NSE:NIFTY',
  interval = 'D',
  theme = 'light',
  height = 340,
  width = '100%',
  showToolbar = true,
  showSideToolbar = false,
  allowSymbolChange = false,
  containerId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = containerId ?? `tv_${symbol.replace(/[^a-z0-9]/gi, '_')}_${interval}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container__widget';
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'Asia/Kolkata',
      theme,
      style: '1',
      locale: 'en',
      toolbar_bg: theme === 'dark' ? '#131c2e' : '#f1f3fa',
      enable_publishing: false,
      hide_top_toolbar: !showToolbar,
      hide_side_toolbar: !showSideToolbar,
      allow_symbol_change: allowSymbolChange,
      save_image: false,
      container_id: id,
      hide_volume: false,
      withdateranges: true,
      support_host: 'https://www.tradingview.com',
    });

    el.appendChild(wrapper);
    el.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [symbol, interval, theme, id, showToolbar, showSideToolbar, allowSymbolChange]);

  return (
    <div
      id={id}
      ref={containerRef}
      className="tv-widget-wrap"
      style={{ height, width }}
    />
  );
});
TradingViewWidget.displayName = 'TradingViewWidget';

// ── Symbol Overview widget (price + mini chart, no login needed)
export const TradingViewSymbolOverview: React.FC<{
  symbols: string[][];   // e.g. [["HDFC Bank","NSE:HDFCBANK|1D"]]
  theme?: ChartTheme;
  height?: number;
}> = memo(({ symbols, theme = 'light', height = 300 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const id  = `tvsov_${symbols[0]?.[1]?.replace(/[^a-z0-9]/gi, '_') ?? 'default'}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols,
      chartOnly: false,
      width: '100%',
      height,
      locale: 'en',
      colorTheme: theme,
      autosize: false,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      maLineColor: '#2962FF',
      maLineWidth: 1,
      maLength: 9,
      headerFontSize: 'medium',
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
    });

    el.appendChild(script);
    return () => { if (ref.current) ref.current.innerHTML = ''; };
  }, [symbols, theme, height, id]);

  return <div ref={ref} className="tv-widget-wrap" style={{ height }} />;
});
TradingViewSymbolOverview.displayName = 'TradingViewSymbolOverview';

// ── Ticker tape ───────────────────────────────────────────────
export const TradingViewTicker: React.FC<{ theme?: ChartTheme }> = memo(({ theme = 'light' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'NSE:NIFTY',     title: 'NIFTY 50'  },
        { proName: 'BSE:SENSEX',    title: 'SENSEX'     },
        { proName: 'NSE:BANKNIFTY', title: 'BANK NIFTY' },
        { proName: 'NSE:INFY',      title: 'INFY'       },
        { proName: 'NSE:TCS',       title: 'TCS'        },
        { proName: 'NSE:HDFCBANK',  title: 'HDFC BANK'  },
        { proName: 'NSE:ONGC',      title: 'ONGC'       },
        { proName: 'NASDAQ:TSLA',   title: 'TSLA'       },
      ],
      showSymbolLogo: true,
      colorTheme: theme,
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
    });
    el.appendChild(script);
    return () => { if (ref.current) ref.current.innerHTML = ''; };
  }, [theme]);

  return <div ref={ref} className="tv-ticker-wrap" />;
});
TradingViewTicker.displayName = 'TradingViewTicker';

// ── Mini symbol overview (single stock overview card) ─────────
export const TradingViewMiniChart: React.FC<{
  symbol: string;
  theme?: ChartTheme;
  height?: number;
}> = memo(({ symbol, theme = 'light', height = 120 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      height,
      locale: 'en',
      dateRange: '1D',
      colorTheme: theme,
      trendLineColor: '#2563eb',
      underLineColor: 'rgba(37,99,235,0.08)',
      underLineBottomColor: 'rgba(41,98,255,0)',
      isTransparent: false,
      autosize: false,
    });
    el.appendChild(script);
    return () => { if (ref.current) ref.current.innerHTML = ''; };
  }, [symbol, theme, height]);

  return <div ref={ref} className="tv-mini-chart-wrap" style={{ height }} />;
});
TradingViewMiniChart.displayName = 'TradingViewMiniChart';
