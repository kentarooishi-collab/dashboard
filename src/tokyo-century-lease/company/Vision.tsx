import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from 'lucide-react';
import { t } from './glossary';
import p07 from './vision/p07.jpg';
import p10 from './vision/p10.jpg';
import p11 from './vision/p11.jpg';
import p14 from './vision/p14.jpg';
import p15 from './vision/p15.jpg';
import p18 from './vision/p18.jpg';
import p39 from './vision/p39.jpg';

export const PLAN_PDF = 'https://ssl4.eir-parts.net/doc/8439/tdnet/2802715/00.pdf';

interface Slide { src: string; page: number; label: string; title: string; point: string; keywords: string[] }

// 公式資料「長期ビジョン2035・中期経営計画2030」（2026年5月11日）のページ画像
export const slides: Slide[] = [
  {
    src: p07, page: 7, label: 'Purpose', title: '青い地球の未来をつくる',
    point: '気候変動、地政学リスク、AI・デジタル革命、日本の人口減少。こうした課題に、パートナーとの共創力、モノの価値を見極める力、専門性の高い人財を結集して挑む、という宣言。',
    keywords: ['社会課題', '共創', 'モノの目利き'],
  },
  {
    src: p10, page: 10, label: 'Vision', title: '地球規模の社会課題を解決に導く“永遠のベンチャー企業”',
    point: '他が手掛けないニッチな分野に深く切り込み、社会的イノベーションの起点になる。2035年には社会課題解決のリーディングカンパニーを目指す。',
    keywords: ['ニッチ', 'イノベーション', '2035年'],
  },
  {
    src: p18, page: 18, label: '中期経営計画2030', title: '〜Shaping Our Blue Planet〜',
    point: '今後5年間で「事業ポートフォリオの変革」と「バリューチェーンの拡大」を推し進める。人財戦略、経営基盤・ガバナンス、企業カルチャーの変革もあわせて進める。',
    keywords: ['ポートフォリオ変革', 'バリューチェーン', '人財'],
  },
  {
    src: p11, page: 11, label: '考え方', title: '2035年の「ありたい姿」から逆算する',
    point: '足元の延長で予測するのではなく、10年後の社会課題とありたい姿を先に描き、2030年の中期経営計画をその中間点として置いている。',
    keywords: ['バックキャスト', '中間点'],
  },
  {
    src: p14, page: 14, label: '事業構造の改革', title: 'アセットから、アセットの周辺機能へ',
    point: '太陽光・蓄電池・航空機・船舶・モビリティなどのアセットを起点に、整備、リユース・リサイクル、データ、運航などの周辺機能へ広げる。さらに外部資本を使ったファンド運営やアセットマネジメントで伸ばす。',
    keywords: ['周辺機能', '外部資本', 'ファンド運営'],
  },
  {
    src: p39, page: 39, label: 'バリューチェーン', title: 'モノの「利用期・満了期」へ進出する',
    point: 'リース・ファイナンス中心の既存領域から、収益性の高いモノの利用期・満了期へ。整備工場、中古車販売、BPO、リサイクル、電力販売などが拡大領域として描かれている。',
    keywords: ['利用期', '満了期', 'リサイクル'],
  },
  {
    src: p15, page: 15, label: '2035年度に目指す水準', title: '純利益4,000億円・ROE15%以上',
    point: '純利益は2025年度の1,113億円から約3.6倍へ。「モノ」「事業」に加え、キャピタルライトで伸ばす収益構造に変え、時価総額5兆円程度を目指す。',
    keywords: ['3.6倍', 'キャピタルライト', '時価総額'],
  },
];

export function Vision() {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const s = slides[i];
  const go = useCallback((d: number) => setI((x) => (x + d + slides.length) % slides.length), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, go]);

  return (
    <section id="vision" className="vision">
      <div className="vision__bg" style={{ backgroundImage: `url(${p07})` }} aria-hidden />
      <div className="container vision__inner">
        <header className="section__head vision__head">
          <p className="section__eyebrow"><span className="num">05</span>ビジョン2035</p>
          <h2 className="section__title">「青い地球の未来をつくる」<br />東京センチュリーが描く10年後</h2>
          <p className="section__lead">2026年5月に公表された「長期ビジョン2035・中期経営計画2030」の公式資料から、ビジョンを語るページを抜き出しました。左右の矢印やサムネイルでページを切り替え、画像をクリックすると大きく表示できます。</p>
        </header>

        <div className="viewer">
          <div className="viewer__stage">
            <button type="button" className="viewer__img" onClick={() => setZoom(true)} aria-label={`p.${s.page}「${s.title}」を拡大表示`}>
              <img key={s.src} src={s.src} alt={`東京センチュリー公式資料 p.${s.page}：${s.title}`} />
              <span className="viewer__zoom"><Maximize2 size={16} />拡大</span>
            </button>
            <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => go(-1)} aria-label="前のページ"><ChevronLeft size={22} /></button>
            <button type="button" className="viewer__nav viewer__nav--next" onClick={() => go(1)} aria-label="次のページ"><ChevronRight size={22} /></button>
          </div>
          <aside className="viewer__side" aria-live="polite">
            <p className="viewer__count num">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</p>
            <span className="viewer__label">{s.label}</span>
            <h3>{s.title}</h3>
            <p className="viewer__point-label">ここがポイント</p>
            <p className="viewer__point">{t(s.point)}</p>
            <div className="chips">{s.keywords.map((k) => <span key={k} className="chip">{k}</span>)}</div>
            <a className="viewer__src" href={`${PLAN_PDF}#page=${s.page}`} target="_blank" rel="noreferrer">
              公式資料 p.{s.page} を開く <ExternalLink size={13} />
            </a>
          </aside>
        </div>

        <div className="thumbs" role="tablist" aria-label="ページ一覧">
          {slides.map((x, j) => (
            <button key={x.page} type="button" role="tab" aria-selected={i === j} className={`thumb ${i === j ? 'is-on' : ''}`} onClick={() => setI(j)}>
              <img src={x.src} alt="" loading="lazy" />
              <span>{x.label}</span>
            </button>
          ))}
        </div>
        <p className="vision__credit">画像出典：東京センチュリー株式会社「『TC Compass』長期ビジョン2035・中期経営計画2030」（2026年5月11日）各ページ。All Rights Reserved, Copyright © Tokyo Century Corporation</p>
      </div>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={s.title} onClick={() => setZoom(false)}>
          <button type="button" className="lightbox__close" onClick={() => setZoom(false)} aria-label="閉じる"><X size={22} /></button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="前のページ"><ChevronLeft size={28} /></button>
          <img src={s.src} alt={`東京センチュリー公式資料 p.${s.page}：${s.title}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="次のページ"><ChevronRight size={28} /></button>
          <p className="lightbox__caption">p.{s.page}｜{s.label}：{s.title}（© Tokyo Century Corporation）</p>
        </div>
      )}
    </section>
  );
}

/** 業界・競合ページ用の「目指す姿」バナー */
export function VisionTeaser({ href }: { href: string }) {
  return (
    <a className="vision-teaser" href={href}>
      <span className="vision-teaser__bg" style={{ backgroundImage: `url(${p10})` }} aria-hidden />
      <span className="vision-teaser__body">
        <span className="vision-teaser__eyebrow">VISION 2035</span>
        <span className="vision-teaser__title">「青い地球の未来をつくる」<br />地球規模の社会課題を解決に導く“永遠のベンチャー企業”へ</span>
        <span className="vision-teaser__cta">公式資料のビジョンを見る <ChevronRight size={16} /></span>
      </span>
    </a>
  );
}
