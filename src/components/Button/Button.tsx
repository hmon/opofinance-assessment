import React from "react";
import { cx } from "class-variance-authority";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(styles.Button, className)}
      {...props}
    />
  );
};
