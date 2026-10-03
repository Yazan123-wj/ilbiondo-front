import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

const fieldClassName =
  "mt-4 w-full border-0 border-b border-foreground/20 bg-transparent py-4 font-serif text-xl outline-none transition-colors duration-300 focus:border-accent md:text-2xl";

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

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextareaField({
  id,
  label,
  error,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldShell id={id ?? ""} label={label} error={error}>
      <textarea
        id={id}
        className={cn(fieldClassName, "min-h-28 resize-none md:min-h-32", className)}
        {...props}
      />
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
