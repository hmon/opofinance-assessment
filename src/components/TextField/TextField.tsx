import React, { useId } from "react";
import { cx } from "class-variance-authority";

import styles from "./TextField.module.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, wrapperClassName, className, ...rest } = props;
  const id = useId();

  return (
    <div className={cx(styles.TextField, wrapperClassName)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} ref={ref} className={cx(styles.input, className)} {...rest} />
    </div>
  );
});
