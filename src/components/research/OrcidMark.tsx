/**
 * OrcidMark
 *
 * ORCID's iD mark, drawn rather than fetched: a green disc carrying a lowercase
 * "iD". It is a handful of vectors, so an inline SVG costs no request, scales
 * cleanly, and cannot arrive broken the way a hotlinked logo can.
 *
 * The green is ORCID's own (#A6CE39) and is left alone rather than pulled into
 * the site palette — an identifier mark that has been recoloured stops working
 * as an identifier.
 */
export const OrcidMark = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 256 256" role="img" aria-label="ORCID" className={className}>
    <circle cx="128" cy="128" r="128" fill="#A6CE39" />
    <g fill="#fff">
      <path d="M86.3 186.2H70.9V79.1h15.4v107.1z" />
      <circle cx="78.6" cy="56.8" r="10.1" />
      <path d="M108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7v79.4z" />
    </g>
  </svg>
);
