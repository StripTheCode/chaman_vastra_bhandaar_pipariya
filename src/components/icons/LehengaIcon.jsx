export default function LehengaIcon({ className = "w-5 h-5", ...props }) {
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
      {/* Choli (Blouse Top) */}
      <path d="M22 10l5 3h10l5-3 3 8-6 5h-14l-6-5 3-8z" fill="currentColor" fillOpacity="0.12" />
      <path d="M22 10l5 3h10l5-3 3 8-6 5h-14l-6-5 3-8z" />
      <path d="M27 13c1 3 3 5 5 5s4-2 5-5" />

      {/* Flared Lehenga Skirt (Gher) */}
      <path d="M24 26h16l14 28c-6 3-14 4-22 4s-16-1-22-4l14-28z" fill="currentColor" fillOpacity="0.1" />
      <path d="M24 26h16l14 28c-6 3-14 4-22 4s-16-1-22-4l14-28z" />

      {/* Kalidar Pleat Lines */}
      <path d="M28 26l-6 29" />
      <path d="M32 26v29" />
      <path d="M36 26l6 29" />

      {/* Embellished Zari Border at hem */}
      <path d="M14 51c6 2 12 3 18 3s12-1 18-3" strokeWidth="2" strokeDasharray="2 3" />
    </svg>
  );
}
