"use client";

import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-5">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/30"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg border border-border bg-background p-8 md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="modal-title" className="font-serif text-3xl tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="nav-label text-muted"
          >
            Close
          </button>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
