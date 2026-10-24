"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied");
    } catch {
      setStatus("Couldn't copy. Select the address above instead.");
    }
    // Clear it so copying again is announced again.
    setTimeout(() => setStatus(""), 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground hover:opacity-90"
      >
        Copy email
      </button>
      <span role="status" className="text-sm text-muted">
        {status}
      </span>
    </>
  );
}
