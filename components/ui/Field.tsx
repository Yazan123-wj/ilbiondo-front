import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const fieldClassName =
  "mt-3 w-full border-0 border-b border-border bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-foreground";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="nav-label text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-foreground" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ id, label, error, className, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id ?? ""} label={label} error={error}>
      <input id={id} className={cn(fieldClassName, className)} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

export function SelectField({
  id,
  label,
  error,
  children,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id ?? ""} label={label} error={error}>
      <select id={id} className={cn(fieldClassName, className)} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}
