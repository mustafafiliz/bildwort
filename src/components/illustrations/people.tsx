/**
 * Reusable illustrated characters. Drawn in the same ink-outline style as the objects.
 * A Person stands with feet at (x, y). Units are in the parent SVG's coordinate space.
 */
import type { ReactNode } from "react";
import { INK } from "./objects";

const s = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export type PersonLook = {
  skin: string;
  hair: string;
  hairStyle: "short" | "long" | "bun" | "curly" | "bald";
  top: string;
  bottom: string;
};

export const LOOKS = {
  ayse: { skin: "#C98D63", hair: "#3A2A22", hairStyle: "long", top: "#C23B5B", bottom: "#3B5A8A" },
  jonas: { skin: "#E9B48F", hair: "#B97B3D", hairStyle: "short", top: "#5B8FD0", bottom: "#4A5568" },
  emre: { skin: "#B67B52", hair: "#1F1A17", hairStyle: "curly", top: "#2A8A68", bottom: "#3D4756" },
  lena: { skin: "#EFC3A0", hair: "#E0B456", hairStyle: "bun", top: "#9B87D1", bottom: "#4A5568" },
  doktor: { skin: "#E9B48F", hair: "#8D95A1", hairStyle: "short", top: "#FFFFFF", bottom: "#5B6573" },
  kellner: { skin: "#D9A07A", hair: "#2B2420", hairStyle: "short", top: "#1E2733", bottom: "#1E2733" },
} satisfies Record<string, PersonLook>;

type ArmPose = "down" | "forward" | "up" | "wave" | "eat";

export function Person({
  x,
  y,
  scale = 1,
  look,
  facing = "right",
  armPose = "down",
  held,
  mouth = "smile",
  animate = true,
  className,
}: {
  x: number;
  y: number;
  scale?: number;
  look: PersonLook;
  facing?: "left" | "right";
  armPose?: ArmPose;
  /** Optional object drawn in the front hand, in a local 0..40 box centred on the hand. */
  held?: ReactNode;
  mouth?: "smile" | "open" | "flat";
  /** Only "eat" animates; pass false when the user prefers reduced motion. */
  animate?: boolean;
  className?: string;
}) {
  const flip = facing === "left" ? -1 : 1;
  // Local coordinates: feet at (0,0), head top at about -190.
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * flip} ${scale})`} className={className}>
      {/* legs */}
      <path d="M-14 0v-62M14 0v-62" stroke={look.bottom} strokeWidth="18" strokeLinecap="round" />
      <path d="M-24 0h16M8 0h22" {...s} strokeWidth={7} />
      {/* back arm */}
      <path d="M-22 -118c-10 18-12 38-10 52" fill="none" stroke={look.top} strokeWidth="15" strokeLinecap="round" />
      <circle cx="-31" cy="-62" r="7" fill={look.skin} {...s} strokeWidth={2.5} />
      {/* torso */}
      <path d="M-28 -60v-50c0-18 12-28 28-28s28 10 28 28v50z" fill={look.top} {...s} />
      {/* neck + head */}
      <path d="M-6 -136v-10h12v10" fill={look.skin} {...s} strokeWidth={2.5} />
      <Hair look={look} back />
      <circle cx="0" cy="-166" r="24" fill={look.skin} {...s} />
      <Hair look={look} />
      <circle cx="9" cy="-168" r="2.8" fill={INK} />
      <circle cx="-5" cy="-168" r="2.8" fill={INK} />
      {mouth === "smile" && <path d="M-1 -156c4 3 9 3 12 0" fill="none" {...s} strokeWidth={2.5} />}
      {mouth === "open" && <ellipse cx="6" cy="-154" rx="5" ry="4" fill="#8C3B3B" {...s} strokeWidth={2} />}
      {mouth === "flat" && <path d="M0 -155h10" {...s} strokeWidth={2.5} />}
      {/* front arm */}
      <FrontArm pose={armPose} look={look} held={held} animate={animate} />
    </g>
  );
}

function FrontArm({ pose, look, held, animate }: { pose: ArmPose; look: PersonLook; held?: ReactNode; animate: boolean }) {
  const sleeve = { fill: "none", stroke: look.top, strokeWidth: 15, strokeLinecap: "round" as const };
  if (pose === "forward") {
    return (
      <g>
        <path d="M18 -118c14 10 30 20 48 22" {...sleeve} />
        <circle cx="70" cy="-96" r="8" fill={look.skin} {...s} strokeWidth={2.5} />
        {held && <g transform="translate(70 -96)">{held}</g>}
      </g>
    );
  }
  if (pose === "up" || pose === "wave") {
    return (
      <g>
        <path d="M18 -118c14-8 22-24 24-44" {...sleeve} />
        <circle cx="42" cy="-168" r="8" fill={look.skin} {...s} strokeWidth={2.5} />
      </g>
    );
  }
  if (pose === "eat") {
    // Upper arm to the elbow, then a forearm that lifts the food to the mouth (SMIL, local coordinates).
    return (
      <g>
        <path d="M18 -118c10 8 18 16 22 22" {...sleeve} />
        <g>
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 40 -96;0 40 -96;-86 40 -96;-86 40 -96;0 40 -96"
              keyTimes="0;0.25;0.45;0.65;1"
              dur="3.6s"
              repeatCount="indefinite"
            />
          )}
          <path d="M40 -96c16 -4 30 -8 46 -12" {...sleeve} />
          <circle cx="88" cy="-108" r="8" fill={look.skin} {...s} strokeWidth={2.5} />
          {held && <g transform="translate(88 -112)">{held}</g>}
        </g>
      </g>
    );
  }
  return (
    <g>
      <path d="M22 -118c10 18 12 38 10 52" {...sleeve} />
      <circle cx="31" cy="-62" r="7" fill={look.skin} {...s} strokeWidth={2.5} />
    </g>
  );
}

function Hair({ look, back }: { look: PersonLook; back?: boolean }) {
  const f = { fill: look.hair, ...s, strokeWidth: 2.5 };
  switch (look.hairStyle) {
    case "long":
      return back ? (
        <path d="M-27 -166c0-26 14-38 29-38s27 12 27 38v26c0 10-8 14-14 14h-28c-8 0-14-4-14-14z" {...f} />
      ) : (
        <path d="M-25 -170c2-20 14-30 28-30 14 0 24 10 24 26-14-2-30-8-38-18-4 10-8 16-14 22z" {...f} />
      );
    case "bun":
      return back ? (
        <circle cx="-14" cy="-196" r="12" {...f} />
      ) : (
        <path d="M-24 -170c0-20 12-30 26-30s24 10 24 26c-14-4-28-10-36-16-4 8-8 14-14 20z" {...f} />
      );
    case "curly":
      return back ? null : (
        <path d="M-24 -168c-6-10 0-22 8-24 2-10 14-14 22-10 8-6 20-2 22 8 8 4 8 14 4 20-10-6-26-10-38-8-6 4-12 10-18 14z" {...f} />
      );
    case "bald":
      return null;
    default:
      return back ? null : (
        <path d="M-24 -170c0-20 12-28 26-28 14 0 24 8 24 24-10-4-20-6-30-6-8 0-14 4-20 10z" {...f} />
      );
  }
}

/** Speech bubble anchored by its tail at (x, y). */
export function Bubble({ x, y, w, h, side = "right", children }: { x: number; y: number; w: number; h: number; side?: "left" | "right"; children?: ReactNode }) {
  const bx = side === "right" ? x - 20 : x - w + 20;
  const by = y - h - 14;
  const tail = side === "right" ? `M${x} ${y}l4 -16h18z` : `M${x} ${y}l-4 -16h-18z`;
  return (
    <g>
      <rect x={bx} y={by} width={w} height={h} rx="14" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d={tail} fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d={side === "right" ? `M${x + 1} ${y - 15}h20` : `M${x - 1} ${y - 15}h-20`} stroke="#fff" strokeWidth="4" />
      {children}
    </g>
  );
}
