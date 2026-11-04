export default function FabricIcon({ className = "w-5 h-5", ...props }) {
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
      {/* Textile / Silk Fabric Roll */}
      <ellipse cx="16" cy="32" rx="8" ry="16" fill="currentColor" fillOpacity="0.12" />
      <ellipse cx="16" cy="32" rx="8" ry="16" />
      <path d="M16 16h34c4.4 0 8 7.2 8 16s-3.6 16-8 16H16" />
      <path d="M50 16c4.4 0 8 7.2 8 16s-3.6 16-8 16" />
      {/* Unrolled flowing drape */}
      <path d="M24 48c0 5 8 9 18 9h12c-3-3-5-6-5-9" fill="currentColor" fillOpacity="0.08" />
      <path d="M24 48c0 5 8 9 18 9h12c-3-3-5-6-5-9" />
      {/* Weave texture lines */}
      <path d="M30 22h16" strokeDasharray="3 3" />
      <path d="M28 32h18" strokeDasharray="3 3" />
      <path d="M30 42h16" strokeDasharray="3 3" />
    </svg>
  );
}
