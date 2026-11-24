"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
   useEffect(() => {
      console.error("Application route failed to render", error);
   }, [error]);

   return (
      <main className="flex min-h-dvh items-center justify-center bg-[#080808] px-6 text-center text-white">
         <div className="max-w-md space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">Page unavailable</p>
            <h1 className="text-2xl font-semibold">We couldn&apos;t load this page.</h1>
            <p className="text-sm text-white/55">Please try again. Your saved information has not been changed.</p>
            <button onClick={unstable_retry} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/85">
               Try again
            </button>
         </div>
      </main>
   );
}
