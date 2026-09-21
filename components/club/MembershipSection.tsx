"use client";

import { useState, type FormEvent } from "react";

import { MembershipCard } from "@/components/club/MembershipCard";
import { TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";

type MembershipState = {
  name: string;
  email: string;
  phone: string;
};

const INITIAL: MembershipState = {
  name: "",
  email: "",
  phone: "",
};

export function MembershipSection() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<MembershipState>(INITIAL);
  const [errors, setErrors] = useState<Partial<MembershipState>>({});
  const [ready, setReady] = useState(false);
  const [displayName, setDisplayName] = useState("Member");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<MembershipState> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!values.email.trim()) nextErrors.email = "Please enter your email.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter your phone number.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // TODO: Connect to Django membership API
    setDisplayName(values.name.trim());
    setReady(true);
    setOpen(false);
  };

  return (
    <section id="membership" className="px-5 py-20 md:px-10 md:py-28">
      <p className="nav-label text-muted">Your Membership</p>
      <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight md:text-6xl">
        Your membership
      </h2>
      <p className="mt-8 max-w-2xl text-base leading-8 text-muted">
        Create your personal IL BIONDO membership card and keep it with you
        digitally.
      </p>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        Your membership identifies you at the atelier and gives you access to
        IL BIONDO Club privileges and member-only services.
      </p>
      <div className="mt-12">
        <MembershipCard name={displayName} />
      </div>
      <button
        type="button"
        className="nav-label mt-10"
        onClick={() => setOpen(true)}
      >
        Create your Membership
      </button>
      {ready ? (
        <p className="mt-6 max-w-md text-sm leading-7 text-muted">
          Your membership details are ready to be submitted.
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
        <button
          type="button"
          className="nav-label text-muted"
          // TODO: Connect Apple Wallet pass generation
        >
          Add to Apple Wallet
        </button>
        <button
          type="button"
          className="nav-label text-muted"
          // TODO: Connect Google Wallet pass generation
        >
          Add to Google Wallet
        </button>
      </div>

      <Modal
        open={open}
        title="Create your membership"
        onClose={() => setOpen(false)}
      >
        <form onSubmit={onSubmit} className="space-y-8" noValidate>
          <TextField
            id="member-name"
            label="Full name"
            value={values.name}
            error={errors.name}
            onChange={(event) =>
              setValues((current) => ({ ...current, name: event.target.value }))
            }
          />
          <TextField
            id="member-email"
            type="email"
            label="Email"
            value={values.email}
            error={errors.email}
            onChange={(event) =>
              setValues((current) => ({ ...current, email: event.target.value }))
            }
          />
          <TextField
            id="member-phone"
            type="tel"
            label="Phone"
            value={values.phone}
            error={errors.phone}
            onChange={(event) =>
              setValues((current) => ({ ...current, phone: event.target.value }))
            }
          />
          <button
            type="submit"
            className="inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
          >
            Continue
          </button>
        </form>
      </Modal>
    </section>
  );
}
