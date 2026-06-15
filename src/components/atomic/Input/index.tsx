import { TextField } from "@mui/material";

interface InputProps {
  id?: string;
  width?: string | "1";
  label?: string;
  placeholder?: string;
  type?: string | "text" | "date" | "email" | "password";
  value?: string | number | Date;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      className={`w-${props.width} bg-input border-border text-foreground`}
      variant="outlined"
      value={props.value}
      required={props.required}
      onChange={props.onChange}
      slotProps={
        props.type === "date"
          ? {
              inputLabel: {
                shrink: true,
              },
            }
          : {}
      }
    />
  );
}
