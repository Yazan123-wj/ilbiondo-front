"use client";

import { useState, type FormEvent } from "react";

import { TiltedCard } from "@/components/bits/TiltedCard";
import { MembershipCard } from "@/components/club/MembershipCard";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

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
    if (!values.phone.trim())
      nextErrors.phone = "Please enter your phone number.";

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
    <section
      id="membership"
      className={cn(
        editorialGutter,
        "scroll-mt-24 grid items-center gap-12 py-16 md:scroll-mt-28 md:grid-cols-12 md:gap-10 md:py-28",
      )}
    >
      <div className="md:col-span-6">
        <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
          Your Membership
        </p>
        <h2
          className={cn(
            editorialDisplay,
            "mt-5 text-[clamp(2.5rem,5vw,4.5rem)] uppercase",
          )}
        >
          Your membership
        </h2>
        <div className={cn(editorialBody, "mt-8 space-y-5")}>
          <p>
            Create your personal IL BIONDO membership card and keep it with you
            digitally.
          </p>
          <p>
            Your membership identifies you at the atelier and gives you access
            to IL BIONDO Club privileges and member-only services.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-10 inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
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
            className="nav-label text-muted transition-colors hover:text-foreground"
            // TODO: Connect Apple Wallet pass generation
          >
            Add to Apple Wallet
          </button>
          <button
            type="button"
            className="nav-label text-muted transition-colors hover:text-foreground"
            // TODO: Connect Google Wallet pass generation
          >
            Add to Google Wallet
          </button>
        </div>
        <EditorialCTA href="/club/privileges" className="mt-10">
          The Privileges
        </EditorialCTA>
      </div>

      <div className="md:col-span-5 md:col-start-8">
        <TiltedCard>
          <MembershipCard name={displayName} className="max-w-none" />
        </TiltedCard>
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
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
          />
          <TextField
            id="member-phone"
            type="tel"
            label="Phone"
            value={values.phone}
            error={errors.phone}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                phone: event.target.value,
              }))
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
