import {ReactNode, useEffect, useRef, useState} from "react";
import {InputGroup, InputLeftAddon} from "@chakra-ui/react";
import {UseFormRegisterReturn} from "react-hook-form";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  loading?: boolean;
  setName: (value: string) => unknown;
};

export function FileUpload(props: FileUploadProps) {
  const {register, accept, multiple, children} = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {ref, ...rest} = register as {ref: (instance: HTMLInputElement | null) => void};

  const handleClick = () => inputRef.current?.click();

  useEffect(() => {
    if (!inputRef.current) return;

    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0]?.name;

      if (!file) return;

      props.setName(file);
    };

    inputRef.current.addEventListener("change", handler);
    return () => inputRef.current?.removeEventListener("change", handler);
  }, [inputRef.current]);

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={!!multiple}
        hidden
        accept={accept}
        disabled={props.loading}
        {...rest}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
}
