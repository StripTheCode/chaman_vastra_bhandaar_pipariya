export default function HangerIcon({ className = "w-5 h-5", ...props }) {
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
      {/* Hook */}
      <path d="M32 20c0-6 4-10 9-10s8 3 8 7c0 5-6 8-9 11" />
      {/* Hanger Body */}
      <path d="M30 28l-22 14c-1.5 1-2 2.5-1.5 4s2 2.5 3.5 2.5h44c1.5 0 3-1 3.5-2.5s0-3-1.5-4L34 28c-1-0.6-3-0.6-4 0z" fill="currentColor" fillOpacity="0.12" />
      <path d="M30 28l-22 14c-1.5 1-2 2.5-1.5 4s2 2.5 3.5 2.5h44c1.5 0 3-1 3.5-2.5s0-3-1.5-4L34 28c-1-0.6-3-0.6-4 0z" />
      {/* Bottom Bar */}
      <path d="M10 48.5h44" strokeWidth="2" />
    </svg>
  );
}
