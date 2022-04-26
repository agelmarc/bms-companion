import type { MouseEventHandler } from "react";

interface ThingProps {
  onClick0?: MouseEventHandler<SVGPathElement>;
  onClick1?: MouseEventHandler<SVGPathElement>;
  onClick2?: MouseEventHandler<SVGPathElement>;
}

const Thing: React.FC<ThingProps> = ({ onClick0, onClick1, onClick2 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
      clipRule="evenodd"
      viewBox="0 0 871 880"
    >
      <path
        className="transition-brightness duration-500 hover:brightness-90"
        fill="#eee"
        onClick={onClick2}
        stroke="var(--color-accent)"
        strokeWidth="4"
        d="M651.602 877.083l216.507-125v-250l-216.507-125-216.506 125v250l216.506 125z"
      />
      <path
        className=" transition-brightness duration-500 hover:brightness-90"
        fill="#ddd"
        onClick={onClick1}
        stroke="var(--color-accent)"
        strokeWidth="4"
        d="M435.096 502.083l216.506-125v-250l-216.506-125-216.506 125v250l216.506 125z"
      />
      <path
        className=" transition-brightness hover:brightness-90"
        fill="#ccc"
        onClick={onClick0}
        stroke="var(--color-accent)"
        strokeWidth="4"
        d="M218.59 877.083l216.506-125v-250l-216.506-125-216.507 125v250l216.507 125z"
      />
      <path
        className="pointer-events-none"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        d="M2.083 752.083l216.507-125 216.506 125M435.096 752.083l216.506-125 216.507 125M218.59 377.083l216.506-125 216.506 125"
      />
      <path
        className="pointer-events-none"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="4"
        d="M435.096 502.083l216.506 125 216.507-125M218.59 127.083l216.506 125 216.506-125M2.083 502.083l216.507 125 216.506-125M651.602 877.083v-250M435.096 502.083v-250M218.59 877.083v-250"
      />
    </svg>
  );
};

export default Thing;
