export default function KurtaIcon({ className = "w-5 h-5", ...props }) {
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
      {/* Traditional Indian Kurta Silhouette */}
      <path
        d="M22 8l4 3h12l4-3 12 12-7 6-5-3v30H22V23l-5 3-7-6 12-12z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M22 8l4 3h12l4-3 12 12-7 6-5-3v30H22V23l-5 3-7-6 12-12z" />
      {/* Mandarin Collar & Placket / Buttons */}
      <path d="M27 11c1 2 3 3 5 3s4-1 5-3" />
      <path d="M32 14v16" />
      <circle cx="32" cy="18" r="1" fill="currentColor" />
      <circle cx="32" cy="22" r="1" fill="currentColor" />
      <circle cx="32" cy="26" r="1" fill="currentColor" />
      {/* Side Slits */}
      <path d="M22 42v11" />
      <path d="M42 42v11" />
    </svg>
  );
}
