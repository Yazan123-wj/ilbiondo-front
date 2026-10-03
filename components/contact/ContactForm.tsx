"use client";

import { useState, type FormEvent } from "react";

import { SelectField, TextField, TextareaField } from "@/components/ui/Field";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const SUBJECTS = [
  "General enquiry",
  "Made to Measure",
  "Bespoke",
  "Wedding",
  "IL BIONDO Club",
  "Visit the atelier",
  "Other",
] as const;

const fieldClass = "mt-2 py-2 text-base md:text-lg";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<FormState> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!values.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (!values.subject) nextErrors.subject = "Please select a subject.";
    if (!values.message.trim()) nextErrors.message = "Please write a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // TODO: Connect to Django contact API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col justify-end border-t border-border pt-8">
        <p className="font-serif text-3xl tracking-tight">
          Your message is ready to be sent.
        </p>
        <p className="mt-5 max-w-md text-base leading-8 text-muted">
          The enquiry has been prepared on this page and will reach the atelier
          once contact is connected.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 md:h-full md:justify-between md:gap-4"
      noValidate
    >
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
        <TextField
          id="contact-name"
          label="Full name"
          autoComplete="name"
          className={fieldClass}
          value={values.name}
          error={errors.name}
          onChange={(event) =>
            setValues((current) => ({ ...current, name: event.target.value }))
          }
        />
        <TextField
          id="contact-email"
          type="email"
          label="Email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          error={errors.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
        />
        <TextField
          id="contact-phone"
          type="tel"
          label="Phone"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone}
          error={errors.phone}
          onChange={(event) =>
            setValues((current) => ({ ...current, phone: event.target.value }))
          }
        />
        <SelectField
          id="contact-subject"
          label="Subject"
          className={`${fieldClass} appearance-none`}
          value={values.subject}
          error={errors.subject}
          onChange={(event) =>
            setValues((current) => ({ ...current, subject: event.target.value }))
          }
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </SelectField>
      </div>
      <TextareaField
        id="contact-message"
        label="Message"
        rows={2}
        className="mt-2 min-h-16 py-2 text-base md:min-h-20 md:text-lg"
        value={values.message}
        error={errors.message}
        onChange={(event) =>
          setValues((current) => ({ ...current, message: event.target.value }))
        }
      />
      <button
        type="submit"
        className="inline-flex self-start bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
      >
        Send a Message
      </button>
    </form>
  );
}
