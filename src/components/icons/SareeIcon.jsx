export default function SareeIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Saree Draped Silhouette (Flaticon Clothes Style) */}
      <path d="M22 6c-3 4-5 10-5 16 0 10 5 18 10 24 3 4 5 10 5 12h8c0-4-3-10-6-15-4-7-7-13-7-21 0-5 2-10 4-13L22 6z" fill="currentColor" fillOpacity="0.15" />
      <path d="M22 6c-3 4-5 10-5 16 0 10 5 18 10 24 3 4 5 10 5 12h8c0-4-3-10-6-15-4-7-7-13-7-21 0-5 2-10 4-13L22 6z" />
      {/* Saree Pallu & Pleats */}
      <path d="M31 9c4 3 11 9 15 17 4 8 3 17 0 24l-6 8" />
      <path d="M28 20c3 3 8 7 11 14" />
      <path d="M25 32c2 4 5 8 8 13" />
      {/* Blouse neckline */}
      <path d="M26 6h12l2 6-8 4-8-4 2-6z" />
      {/* Border detail */}
      <line x1="22" y1="58" x2="40" y2="58" strokeWidth="3" />
    </svg>
  );
}
