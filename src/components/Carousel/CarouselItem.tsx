import clsx from "clsx";
import Image from "next/image";
import React, { cloneElement, FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import Button from "@/components/Button";

import type { CarouselItemProps } from "./types";

const CarouselItem: FC<CarouselItemProps> = (props) => {
  const {
    children,
    innerRef,
    src,
    alt,
    index = 0,
    width,
    hasButtons,
    buttonStyle,
    onPrev,
    onNext,
    className,
    size = { width: "w-full", height: "h-[500px]" },
    ...rest
  } = props;

  const renderButtons = () => {
    if (buttonStyle != null) {
      return (
        <>
          {cloneElement(buttonStyle("❮"), {
            onClick: onPrev,
          })}
          {cloneElement(buttonStyle("❯"), {
            onClick: onNext,
          })}
        </>
      );
    }

    return (
      <>
        <Button onClick={onPrev} shape="circle">
          <FaArrowLeft />
        </Button>
        <Button onClick={onNext} shape="circle">
          <FaArrowRight />
        </Button>
      </>
    );
  };

  return (
    <div
      {...rest}
      id={`item${index}`}
      ref={innerRef}
      className={clsx(
        "carousel-item relative",
        className,
        width === "full" && "w-full",
        width == "half" && "w-1/2"
      )}
    >
      <div className={clsx("overflow-hidden", size.height, size.width)}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          children
        )}
      </div>

      {hasButtons && (
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          {renderButtons()}
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
