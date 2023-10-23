import { SVGProps } from "react";

export function IcBaselineHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>
    </svg>
  );
}

export function IcBaselineAccountCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"
      ></path>
    </svg>
  );
}

export function IcOutlineAddCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
      ></path>
    </svg>
  );
}

export function IcSharpFormatListBulleted(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
      ></path>
    </svg>
  );
}

export function LogosGoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.98em"
      height="1em"
      viewBox="0 0 256 262"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      ></path>
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  );
}

export function SvgSpinnersGooeyBalls1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <filter id="svgSpinnersGooeyBalls10">
          <feGaussianBlur
            in="SourceGraphic"
            result="y"
            stdDeviation="1.5"
          ></feGaussianBlur>
          <feColorMatrix
            in="y"
            result="z"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
          ></feColorMatrix>
          <feBlend in="SourceGraphic" in2="z"></feBlend>
        </filter>
      </defs>
      <g fill="currentColor" filter="url(#svgSpinnersGooeyBalls10)">
        <circle cx="4" cy="12" r="3">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="0.75s"
            keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
            repeatCount="indefinite"
            values="4;9;4"
          ></animate>
          <animate
            attributeName="r"
            calcMode="spline"
            dur="0.75s"
            keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
            repeatCount="indefinite"
            values="3;8;3"
          ></animate>
        </circle>
        <circle cx="15" cy="12" r="8">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="0.75s"
            keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
            repeatCount="indefinite"
            values="15;20;15"
          ></animate>
          <animate
            attributeName="r"
            calcMode="spline"
            dur="0.75s"
            keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
            repeatCount="indefinite"
            values="8;3;8"
          ></animate>
        </circle>
      </g>
    </svg>
  );
}