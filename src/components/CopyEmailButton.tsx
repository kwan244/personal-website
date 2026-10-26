"use client";

import { useState } from "react";
import { Icon, icons } from "@/components/Icon";

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
    <span className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="flex min-h-14 items-center gap-3 rounded-xl border border-border px-5 text-lg font-medium transition-colors hover:border-accent hover:text-accent"
      >
        <Icon d={icons.copy} className="size-6" />
        Copy email
      </button>
      <span role="status" className="text-sm text-muted">
        {status}
      </span>
    </span>
  );
}
