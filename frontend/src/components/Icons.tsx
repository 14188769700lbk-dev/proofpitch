import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function QueueIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>;
}

export function EvidenceIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/></svg>;
}

export function ReviewIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 5h16v12H9l-5 4z"/><path d="M8 9h8M8 13h5"/></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m8 5 11 7-11 7z"/></svg>;
}

export function BriefcaseIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>;
}

export function ChevronIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m9 18 6-6-6-6"/></svg>;
}

export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z"/><path d="m9 12 2 2 4-5"/></svg>;
}

export function BuildingIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 21h16M6 21V5h9v16M15 9h3v12M9 8h2M9 12h2M9 16h2"/></svg>;
}

export function CardIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>;
}

export function LockIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m5 12 4 4L19 6"/></svg>;
}

export function AlertIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 2.5 20h19z"/><path d="M12 9v5M12 17h.01"/></svg>;
}

export function InfoIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>;
}

export function ExternalIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>;
}

export function ListIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>;
}

export function LinkIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>;
}
