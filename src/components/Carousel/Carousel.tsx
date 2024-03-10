import clsx from "clsx";
import React, {
  cloneElement,
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useState,
} from "react";

import Button from "@/components/Button";

import type { CarouselProps } from "./types";

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref): JSX.Element => {
    const {
      children,
      display = "slider",
      snap,
      vertical,
      width,
      buttonStyle,
      className,
      ...rest
    } = props;

    const [itemRefs, setItemRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
      const newRefs: RefObject<HTMLDivElement>[] = [];

      children.map((_) => {
        newRefs.push(createRef<HTMLDivElement>());
      });

      setItemRefs(newRefs);
    }, [children]);

    const scrollToIndex = (index: number) => {
      itemRefs[index].current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: snap,
      });

      setActiveIndex(index);
    };

    return (
      <>
        <div
          role="listbox"
          aria-label="Image carousel"
          {...rest}
          ref={ref}
          className={clsx(
            "carousel",
            className,
            snap === "center" && "carousel-center",
            snap === "end" && "carousel-end",
            vertical && "carousel-vertical",
            display != "slider" && "w-full"
          )}
        >
          {children.map((child, i) => {
            return cloneElement(child, {
              key: i,
              innerRef: itemRefs[i],
              index: i + 1,
              children: child.props.children,
              src: child.props.src,
              alt: child.props.alt,
              width: display !== "slider" ? "full" : width,
              hasButtons: display === "sequential",
              buttonStyle,
              onPrev: () =>
                scrollToIndex(i - 1 < 0 ? children.length - 1 : i - 1),
              onNext: () =>
                scrollToIndex(i + 1 > children.length - 1 ? 0 : i + 1),
              ...child.props,
            });
          })}
        </div>
        {display === "numbered" && (
          <div className="flex w-full justify-center gap-2 py-2">
            {children.map((_, i) => {
              if (buttonStyle != null) {
                return cloneElement(buttonStyle((i + 1).toString()), {
                  key: i,
                  onClick: () => scrollToIndex(i),
                });
              }

              return (
                <Button
                  variant={i === activeIndex ? "active" : "info"}
                  key={i}
                  onClick={() => scrollToIndex(i)}
                >
                  {i + 1}
                </Button>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

export default Carousel;
