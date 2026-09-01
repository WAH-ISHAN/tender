"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/signout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
      className="rounded-[8px] px-2.5 py-1 text-[12px] text-ink-500 hover:bg-ink-100 hover:text-ink-800"
    >
      Sign out
    </button>
  );
}
