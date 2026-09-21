"use client";

import { useState, type FormEvent } from "react";

import { SelectField, TextField } from "@/components/ui/Field";
import { APPOINTMENT_SERVICES, APPOINTMENT_TIMES } from "@/lib/contact";

type FormState = {
  service: string;
  date: string;
  time: string;
};

const INITIAL: FormState = {
  service: "",
  date: "",
  time: "",
};

export function AppointmentForm() {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<FormState> = {};
    if (!values.service) nextErrors.service = "Please select a service.";
    if (!values.date) nextErrors.date = "Please choose a date.";
    if (!values.time) nextErrors.time = "Please choose a time.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // TODO: Connect to Django appointments API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border-t border-border pt-10">
        <p className="font-serif text-3xl tracking-tight">
          Your appointment request is ready to be submitted.
        </p>
        <p className="mt-5 max-w-md text-base leading-8 text-muted">
          The request has been prepared on this page and will be sent to the
          atelier once booking is connected.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate>
      <SelectField
        id="service"
        label="Service"
        value={values.service}
        error={errors.service}
        onChange={(event) =>
          setValues((current) => ({ ...current, service: event.target.value }))
        }
      >
        <option value="">Select a service</option>
        {APPOINTMENT_SERVICES.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </SelectField>
      <TextField
        id="date"
        type="date"
        label="Choose a Date"
        value={values.date}
        error={errors.date}
        onChange={(event) =>
          setValues((current) => ({ ...current, date: event.target.value }))
        }
      />
      <SelectField
        id="time"
        label="Choose a Time"
        value={values.time}
        error={errors.time}
        onChange={(event) =>
          setValues((current) => ({ ...current, time: event.target.value }))
        }
      >
        <option value="">Select a time</option>
        {APPOINTMENT_TIMES.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </SelectField>
      <button
        type="submit"
        className="inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
      >
        Book your Appointment
      </button>
    </form>
  );
}
