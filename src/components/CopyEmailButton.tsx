"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied");
    } catch {
      setStatus("Couldn't copy. Select the address instead.");
    }
    // Clear it so copying again is announced again.
    setTimeout(() => setStatus(""), 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="min-h-11 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
      >
        Copy email
      </button>
      <span role="status" className="text-sm text-muted">
        {status}
      </span>
    </>
  );
}
