import type { ReactNode } from 'react';

interface Props {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}

export function Section({ id, index, eyebrow, title, lead, children }: Props) {
  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__head">
          <p className="section__eyebrow"><span className="num">{index}</span>{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
