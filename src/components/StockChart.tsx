import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type HistogramData,
  type Time,
} from 'lightweight-charts';

// ── Yahoo Finance symbol map ──────────────────────────────────
const YAHOO_MAP: Record<string, string> = {
  'NIFTY50': '^NSEI',   'NIFTY': '^NSEI',
  'BANKNIFTY': '^NSEBANK', 'NIFTYBANK': '^NSEBANK',
  'SENSEX': '^BSESN',
  'HDFCBANK': 'HDFCBANK.NS', 'HDFC': 'HDFCBANK.NS',
  'ICICIBANK': 'ICICIBANK.NS', 'ICICI': 'ICICIBANK.NS',
  'SBIN': 'SBIN.NS', 'SBI': 'SBIN.NS', 'STATEBANKOFINDIA': 'SBIN.NS',
  'AXISBANK': 'AXISBANK.NS', 'AXIS': 'AXISBANK.NS',
  'KOTAKBANK': 'KOTAKBANK.NS', 'KOTAK': 'KOTAKBANK.NS',
  'INFY': 'INFY.NS', 'INFOSYS': 'INFY.NS',
  'TCS': 'TCS.NS', 'ONGC': 'ONGC.NS',
  'RELIANCE': 'RELIANCE.NS', 'WIPRO': 'WIPRO.NS',
  'HCLTECH': 'HCLTECH.NS', 'HCL': 'HCLTECH.NS',
  'TATAMOTORS': 'TATAMOTORS.NS', 'TATA': 'TATAMOTORS.NS',
  'TATASTEEL': 'TATASTEEL.NS',
  'MARUTI': 'MARUTI.NS', 'MARUTISUZUKI': 'MARUTI.NS',
  'SUNPHARMA': 'SUNPHARMA.NS',
  'BAJFINANCE': 'BAJFINANCE.NS', 'BAJAJFINANCE': 'BAJFINANCE.NS',
  'LT': 'LT.NS', 'ITC': 'ITC.NS',
  'HINDUNILVR': 'HINDUNILVR.NS', 'HUL': 'HINDUNILVR.NS',
  'BHARTIAIRTEL': 'BHARTIARTL.NS', 'AIRTEL': 'BHARTIARTL.NS',
  'NTPC': 'NTPC.NS', 'POWERGRID': 'POWERGRID.NS',
  'COALINDIA': 'COALINDIA.NS', 'ADANIPORTS': 'ADANIPORTS.NS',
  'ASIANPAINT': 'ASIANPAINT.NS', 'ASIANPAINTS': 'ASIANPAINT.NS',
  'TITAN': 'TITAN.NS', 'IEL': 'IEL.NS',
  'NESTLEIND': 'NESTLEIND.NS', 'NESTLE': 'NESTLEIND.NS',
  'INDUSINDBK': 'INDUSINDBK.NS',
  'DRREDDY': 'DRREDDY.NS', 'CIPLA': 'CIPLA.NS',
  'JSWSTEEL': 'JSWSTEEL.NS', 'HINDALCO': 'HINDALCO.NS',
  'BAJAJFINSV': 'BAJAJFINSV.NS',
  'SUZLON': 'SUZLON.NS', 'SUZLONENERGY': 'SUZLON.NS',
  'HEROMOTOCO': 'HEROMOTOCO.NS', 'BRITANNIA': 'BRITANNIA.NS',
  'AEQUS': 'AEQUS.NS',
  'TSLA': 'TSLA', 'AAPL': 'AAPL', 'MSFT': 'MSFT',
  'GOOGL': 'GOOGL', 'AMZN': 'AMZN', 'META': 'META', 'NVDA': 'NVDA',
  'VIX': '^VIX', 'VOLATILITY': '^VIX',
};

export const resolveYahooSymbol = (name: string): string => {
  const n1 = name.toUpperCase().replace(/\s+/g, '');
  const n2 = name.toUpperCase().split(/\s+/)[0];
  return YAHOO_MAP[n1] ?? YAHOO_MAP[n2] ?? `${n1}.NS`;
};

// ── Range params ──────────────────────────────────────────────
type RangeKey = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';

const RANGE_PARAMS: Record<RangeKey, { range: string; interval: string }> = {
  '1D':  { range: '1d',  interval: '5m'  },
  '1W':  { range: '5d',  interval: '30m' },
  '1M':  { range: '1mo', interval: '1d'  },
  '3M':  { range: '3mo', interval: '1d'  },
  '6M':  { range: '6mo', interval: '1d'  },
  '1Y':  { range: '1y',  interval: '1d'  },
  'All': { range: '5y',  interval: '1wk' },
};

// ── Fetch via multiple proxy strategies ───────────────────────
interface OHLCBar {
  time: Time;
  open: number; high: number; low: number; close: number;
  volume: number;
}

function parseYahooResponse(json: unknown): OHLCBar[] {
  const data = json as Record<string, unknown>;
  const result = (data?.chart as Record<string, unknown>)?.result as unknown[];
  const r = result?.[0] as Record<string, unknown>;
  if (!r) throw new Error('No data');

  const ts = r.timestamp as number[];
  const q  = (r.indicators as Record<string, unknown[]>)?.quote?.[0] as Record<string, (number|null)[]>;
  const bars: OHLCBar[] = [];

  for (let i = 0; i < ts.length; i++) {
    const o = q.open?.[i], c = q.close?.[i];
    if (o == null || c == null) continue;
    bars.push({
      time:   ts[i] as Time,
      open:   +o.toFixed(2),
      high:   +(q.high?.[i] ?? o).toFixed(2),
      low:    +(q.low?.[i]  ?? o).toFixed(2),
      close:  +c.toFixed(2),
      volume: q.volume?.[i] ?? 0,
    });
  }
  return bars;
}

async function fetchOHLC(sym: string, tf: RangeKey): Promise<OHLCBar[]> {
  const { range, interval } = RANGE_PARAMS[tf];
  const yPath = `/v8/finance/chart/${encodeURIComponent(sym)}?range=${range}&interval=${interval}&includePrePost=false`;
  const yUrl  = `https://query1.finance.yahoo.com${yPath}`;

  // Strategy 1: direct (works when browser sends correct User-Agent)
  try {
    const r = await fetch(yUrl, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) {
      const j = await r.json();
      const bars = parseYahooResponse(j);
      if (bars.length) return bars;
    }
  } catch { /* fall through */ }

  // Strategy 2: allorigins proxy
  try {
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(yUrl)}`;
    const r = await fetch(proxy, { signal: AbortSignal.timeout(10000) });
    if (r.ok) {
      const outer = await r.json() as { contents: string };
      const bars = parseYahooResponse(JSON.parse(outer.contents));
      if (bars.length) return bars;
    }
  } catch { /* fall through */ }

  // Strategy 3: query2 (Yahoo's secondary endpoint)
  try {
    const url2 = `https://query2.finance.yahoo.com${yPath}`;
    const proxy2 = `https://api.allorigins.win/get?url=${encodeURIComponent(url2)}`;
    const r = await fetch(proxy2, { signal: AbortSignal.timeout(10000) });
    if (r.ok) {
      const outer = await r.json() as { contents: string };
      const bars = parseYahooResponse(JSON.parse(outer.contents));
      if (bars.length) return bars;
    }
  } catch { /* fall through */ }

  throw new Error(`Could not fetch data for ${sym}. Try again.`);
}

// ── Component ─────────────────────────────────────────────────
interface StockChartProps {
  stockName: string;
  theme?: 'light' | 'dark';
  height?: number;
  showVolume?: boolean;
}

const TIMEFRAMES: RangeKey[] = ['1D', '1W', '1M', '3M', '6M', '1Y', 'All'];

export const StockChart: React.FC<StockChartProps> = ({
  stockName,
  theme = 'light',
  height = 280,
  showVolume = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<IChartApi | null>(null);
  const candleRef    = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volRef       = useRef<ISeriesApi<'Histogram'> | null>(null);

  const [tf, setTf]         = useState<RangeKey>('1M');
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [errMsg, setErrMsg] = useState('');

  const isDark = theme === 'dark';

  // Build chart when theme/height changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    chartRef.current?.remove();
    chartRef.current  = null;
    candleRef.current = null;
    volRef.current    = null;

    const bg     = isDark ? '#131c2e' : '#ffffff';
    const text   = isDark ? '#94a3b8' : '#64748b';
    const grid   = isDark ? '#1e293b' : '#f1f5f9';
    const border = isDark ? '#1e293b' : '#e2e8f0';

    const chart = createChart(el, {
      width:  el.clientWidth,
      height,
      layout: { background: { type: ColorType.Solid, color: bg }, textColor: text },
      grid:   { vertLines: { color: grid }, horzLines: { color: grid } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: border },
      timeScale: { borderColor: border, timeVisible: true, secondsVisible: false },
    });

    const candle = chart.addCandlestickSeries({
      upColor: '#10b981', downColor: '#ef4444',
      borderUpColor: '#10b981', borderDownColor: '#ef4444',
      wickUpColor: '#10b981', wickDownColor: '#ef4444',
    });

    chartRef.current  = chart;
    candleRef.current = candle;

    if (showVolume) {
      const vol = chart.addHistogramSeries({
        color: 'rgba(37,99,235,0.3)',
        priceFormat: { type: 'volume' },
        priceScaleId: 'vol',
      });
      chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
      volRef.current = vol;
    }

    const ro = new ResizeObserver(() => chart.applyOptions({ width: el.clientWidth }));
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      candleRef.current = null;
      volRef.current = null;
    };
  }, [theme, height, showVolume, isDark]);

  // Load data when stockName or timeframe changes
  const load = useCallback(async () => {
    if (!candleRef.current) return;
    setStatus('loading');
    setErrMsg('');
    try {
      const sym  = resolveYahooSymbol(stockName);
      const bars = await fetchOHLC(sym, tf);
      if (!bars.length) throw new Error('Empty dataset');

      candleRef.current?.setData(
        bars.map(b => ({ time: b.time, open: b.open, high: b.high, low: b.low, close: b.close } as CandlestickData<Time>))
      );
      volRef.current?.setData(
        bars.map(b => ({
          time: b.time, value: b.volume,
          color: b.close >= b.open ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
        } as HistogramData<Time>))
      );
      chartRef.current?.timeScale().fitContent();
      setStatus('ok');
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Failed to load');
      setStatus('error');
    }
  }, [stockName, tf]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="sc-wrap">
      <div className="sc-tf-row">
        {TIMEFRAMES.map(t => (
          <button key={t} className={`sc-tf-btn ${tf === t ? 'active' : ''}`}
            onClick={() => setTf(t)}>{t}</button>
        ))}
      </div>
      <div className="sc-chart-area" style={{ height }}>
        {status === 'loading' && (
          <div className="sc-overlay">
            <div className="sc-spinner" />
            <span>Loading {stockName}…</span>
          </div>
        )}
        {status === 'error' && (
          <div className="sc-overlay sc-overlay-error">
            <span className="sc-err-icon">⚠️</span>
            <span className="sc-err-msg">{errMsg}</span>
            <button className="sc-retry-btn" onClick={load}>Retry</button>
          </div>
        )}
        <div ref={containerRef} className="sc-canvas"
          style={{ opacity: status === 'ok' ? 1 : 0, transition: 'opacity 0.3s' }} />
      </div>
    </div>
  );
};
