// Monogramme « DD » de Dekor & Design, redessiné en vectoriel d'après le logo officiel.

export const LIME = '#9bee37';
export const D_BACK = 'M13.8 19.8H61.6A32.2 32.2 0 0 1 61.6 84.2H13.8Z';
export const D_FRONT = 'M31.5 7A45 45 0 0 1 31.5 97Z';

export function Monogram({ className, color = LIME, stroke = 8.5 }) {
  return (
    <svg className={className} viewBox="0 0 102 105" aria-hidden="true">
      <path d={D_BACK} fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="miter" />
      <path d={D_FRONT} fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="miter" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <Monogram className="brand-mark" />
      <span className="brand-text">
        <b>DEKOR &amp; DESIGN</b>
        <small>Garde-corps</small>
      </span>
    </span>
  );
}
