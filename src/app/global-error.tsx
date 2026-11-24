"use client";

import { useEffect } from "react";

export default function GlobalError({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
   useEffect(() => {
      console.error("Root layout failed to render", error);
   }, [error]);

   return (
      <html lang="en">
         <body style={{ minHeight: "100vh", margin: 0, background: "#080808", color: "#f7f4ee", fontFamily: "Arial, sans-serif" }}>
            <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px", textAlign: "center" }}>
               <div style={{ maxWidth: "420px" }}>
                  <p style={{ color: "#bd9520", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Application error</p>
                  <h1>We couldn&apos;t load the application.</h1>
                  <p style={{ color: "#aaa" }}>Please try again. If the problem continues, reload the page.</p>
                  <button onClick={unstable_retry} style={{ cursor: "pointer", padding: "10px 16px", border: 0, borderRadius: "8px", fontWeight: 600 }}>
                     Try again
                  </button>
               </div>
            </main>
         </body>
      </html>
   );
}
