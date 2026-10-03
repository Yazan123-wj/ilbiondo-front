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

type WalletTarget = "apple" | "google";

type MembershipState = {
  name: string;
  phone: string;
  password: string;
  birthDate: string;
};

const INITIAL: MembershipState = {
  name: "",
  phone: "",
  password: "",
  birthDate: "",
};

export function MembershipSection() {
  const [wallet, setWallet] = useState<WalletTarget | null>(null);
  const [values, setValues] = useState<MembershipState>(INITIAL);
  const [errors, setErrors] = useState<Partial<MembershipState>>({});
  const [ready, setReady] = useState(false);
  const [displayName, setDisplayName] = useState("Member");

  const open = wallet !== null;

  const openWallet = (target: WalletTarget) => {
    setWallet(target);
    setErrors({});
  };

  const closeWallet = () => {
    setWallet(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<MembershipState> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!values.phone.trim())
      nextErrors.phone = "Please enter your phone number.";
    if (values.password.trim().length < 6) {
      nextErrors.password = "Please enter at least 6 characters.";
    }
    if (!values.birthDate) {
      nextErrors.birthDate = "Please enter your date of birth.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // TODO: Connect to Django membership API and wallet pass generation
    setDisplayName(values.name.trim());
    setReady(true);
    setWallet(null);
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
        {ready ? (
          <p className="mt-6 max-w-md text-sm leading-7 text-muted">
            Your membership details are ready to be submitted.
          </p>
        ) : null}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openWallet("apple")}
            className="inline-flex h-16 flex-1 items-center justify-center bg-foreground px-6 text-[12px] tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-85"
          >
            Add to Apple Wallet
          </button>
          <button
            type="button"
            onClick={() => openWallet("google")}
            className="inline-flex h-16 flex-1 items-center justify-center border border-foreground px-6 text-[12px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
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
        eyebrow="Membership"
        title="Open your card"
        description={
          wallet === "google"
            ? "A moment, and your pass is ready for Google Wallet."
            : "A moment, and your pass is ready for Apple Wallet."
        }
        onClose={closeWallet}
      >
        <form onSubmit={onSubmit} className="space-y-8" noValidate>
          <TextField
            id="member-name"
            label="Full name"
            autoComplete="name"
            value={values.name}
            error={errors.name}
            onChange={(event) =>
              setValues((current) => ({ ...current, name: event.target.value }))
            }
          />
          <TextField
            id="member-phone"
            type="tel"
            label="Mobile"
            autoComplete="tel"
            placeholder="+962 7 0000 0000"
            className="placeholder:text-muted/45"
            value={values.phone}
            error={errors.phone}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
          />
          <TextField
            id="member-password"
            type="password"
            label="Password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="placeholder:text-muted/45"
            value={values.password}
            error={errors.password}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
          />
          <TextField
            id="member-birthdate"
            type="date"
            label="Date of birth"
            autoComplete="bday"
            value={values.birthDate}
            error={errors.birthDate}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                birthDate: event.target.value,
              }))
            }
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
          >
            Issue my Card
          </button>
        </form>
      </Modal>
    </section>
  );
}
