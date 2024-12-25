import React from "react";
import { cx } from "class-variance-authority";
import { Slot, Slottable } from "@radix-ui/react-slot";

import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<React.ElementRef<"div">> {
  asChild?: boolean;
}

export const Card = ({
  children,
  className,
  asChild = false,
  ...props
}: CardProps) => {
  const Root = asChild ? Slot : "div";

  return (
    <Root className={cx(styles.card, className)} {...props}>
      <div className={styles["background-effect"]}/>
      <Slottable>
        {children}
      </Slottable>
    </Root>
  );
};
