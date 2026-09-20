import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function UploadIcon({ size = 18, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3" /></svg>; }
export function SendIcon({ size = 17, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="m21 3-7.2 18-3.8-7-7-3.8L21 3Z" /><path d="M21 3 10 14" /></svg>; }
export function FileIcon({ size = 20, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z" /><path d="M14 3v5h5M8 13h8M8 17h5" /></svg>; }
export function CloseIcon({ size = 16, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>; }
export function CheckIcon({ size = 15, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7" /></svg>; }
export function ChevronIcon({ size = 16, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>; }
export function SparkIcon({ size = 18, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></svg>; }
export function ShieldIcon({ size = 14, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M12 3 19 6v5c0 4.4-2.8 8-7 10-4.2-2-7-5.6-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>; }
export function SearchIcon({ size = 16, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>; }
export function MoonIcon({ size = 16, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>; }
export function SunIcon({ size = 16, ...props }: IconProps) { return <svg {...props} {...base} width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>; }
