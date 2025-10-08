declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      background?: string;
      speed?: string | number;
      loop?: boolean | string;
      autoplay?: boolean | string;
      controls?: boolean | string;
      mode?: 'normal' | 'bounce';
      style?: React.CSSProperties;
    };
  }
}


