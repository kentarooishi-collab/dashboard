import { Fragment, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './term.css';

/** 用語集の1項目 */
export interface TermDef {
  term: string;
  /** 正式名称・読みなど（見出しの横に小さく出す） */
  full?: string;
  /** 計算式（あれば） */
  formula?: string;
  desc: string;
  /** たとえ話・目安 */
  example?: string;
}

interface Props {
  def: TermDef;
  children?: ReactNode;
  /** ボタンなど操作可能な要素の中に置くときは false（フォーカス対象にしない） */
  focusable?: boolean;
}

const GAP = 10;
const WIDTH = 300;

/**
 * 専門用語。マウスを乗せる／フォーカスする／タップすると解説がふわっと出て、離れると消える。
 * 解説は body 直下に描画するので、表やグラフの overflow に切られない。
 */
export function Term({ def, children, focusable = true }: Props) {
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean; arrow: number }>({ left: 0, top: 0, above: true, arrow: WIDTH / 2 });

  const show = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    if (open) setVisible(true); // フェードアウト中に戻ってきた
    else setOpen(true);
  }, [open]);
  const hide = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setVisible(false), 60);
  }, []);

  // 位置を計算（上に余裕がなければ下に出す）
  useLayoutEffect(() => {
    if (!open || !ref.current || !tipRef.current) return;
    const r = ref.current.getBoundingClientRect();
    const h = tipRef.current.offsetHeight;
    const w = Math.min(WIDTH, window.innerWidth - 24);
    const center = r.left + r.width / 2;
    const left = Math.max(12, Math.min(center - w / 2, window.innerWidth - w - 12));
    const above = r.top - h - GAP > 8;
    setPos({ left, top: above ? r.top - h - GAP : r.bottom + GAP, above, arrow: Math.max(14, Math.min(center - left, w - 14)) });
    requestAnimationFrame(() => setVisible(true));
  }, [open]);

  // フェードアウトが終わったら外す
  useEffect(() => {
    if (visible || !open) return;
    const t = window.setTimeout(() => setOpen(false), 180);
    return () => window.clearTimeout(t);
  }, [visible, open]);

  // 開いている間：スクロール・Esc・外側タップで閉じる
  useEffect(() => {
    if (!open) return;
    const close = () => setVisible(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) close(); };
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <>
      <span
        ref={ref}
        className="term"
        tabIndex={focusable ? 0 : undefined}
        aria-describedby={open ? id : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(e) => {
          // タッチ端末向け：タップで開閉。ボタン内なら親のクリックも生かす
          if (focusable) e.stopPropagation();
          if (open && visible) hide(); else show();
        }}
      >
        {children ?? def.term}
      </span>
      {open && createPortal(
        <div
          ref={tipRef}
          id={id}
          role="tooltip"
          className={`term-tip ${visible ? 'is-visible' : ''} ${pos.above ? 'is-above' : 'is-below'}`}
          style={{ left: pos.left, top: pos.top, width: Math.min(WIDTH, window.innerWidth - 24), ['--arrow' as string]: `${pos.arrow}px` }}
        >
          <div className="term-tip__head">
            <strong>{def.term}</strong>
            {def.full && <span>{def.full}</span>}
          </div>
          {def.formula && <div className="term-tip__formula">{def.formula}</div>}
          <p>{def.desc}</p>
          {def.example && <p className="term-tip__example">{def.example}</p>}
        </div>,
        document.body,
      )}
    </>
  );
}

/**
 * 文章中の用語を自動で <Term> にする。各用語はブロック内で最初の1回だけ。
 * glossary のキーは本文に現れる表記（例: "ROE", "B/S", "残価"）。
 */
export function withTerms(text: string, glossary: Record<string, TermDef>, focusable = true): ReactNode {
  const keys = Object.keys(glossary).sort((a, b) => b.length - a.length);
  if (!keys.length) return text;
  const re = new RegExp(`(${keys.map((k) => k.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('|')})`, 'g');
  const seen = new Set<string>();
  return text.split(re).map((part, i) => {
    if (glossary[part] && !seen.has(part)) {
      seen.add(part);
      return <Term key={i} def={glossary[part]} focusable={focusable}>{part}</Term>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
