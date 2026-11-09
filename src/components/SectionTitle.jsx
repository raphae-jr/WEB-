export default function SectionTitle({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <div className={`section-title section-title-${align}${light ? ' section-title-light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-title-description">{description}</p>}
    </div>
  );
}
