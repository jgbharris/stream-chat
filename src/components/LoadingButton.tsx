import { ComponentPropsWithRef } from "react";
import Button from "./Button";
import { LoadingIndicator } from "stream-chat-react";

interface LoadingButtonProps extends ComponentPropsWithRef<"button"> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <LoadingIndicator /> : props.children}
    </Button>
  );
}
