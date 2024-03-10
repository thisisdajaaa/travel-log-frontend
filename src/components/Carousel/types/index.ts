import { HTMLAttributes, LegacyRef, ReactElement } from "react";

export type CarouselItemWidth = "full" | "half";

export type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  readonly innerRef?: LegacyRef<HTMLDivElement>;
  src?: string;
  alt?: string;
  index?: number;
  width?: CarouselItemWidth;
  hasButtons?: boolean;
  buttonStyle?: (value: string) => ReactElement;
  onPrev?: () => void;
  onNext?: () => void;
  size?: { width: string; height: string };
};

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactElement<CarouselItemProps>[];
  display?: "slider" | "numbered" | "sequential";
  snap?: "start" | "center" | "end";
  vertical?: boolean;
  width?: CarouselItemWidth;
  buttonStyle?: (value: string) => React.ReactElement;
};
