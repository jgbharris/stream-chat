import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps<T extends React.ElementType> {
  as?: T;
}

export default function Button<T extends React.ElementType = "button">({
  as,
  ...props
}: ButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof ButtonProps<T>>) {
  const Component = as || "button";

  return (
    <Component
      {...props}
      className={twMerge(
        "flex items-center justify-center gap-2 rounded bg-black p-[0.875rem] text-white active:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-600",
        props.className
      )}
    />
  );
}
