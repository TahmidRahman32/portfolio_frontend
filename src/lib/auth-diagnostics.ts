type AuthDiagnosticFields = Record<string, string | number | boolean | null>;

export function authDiagnostic(event: string, fields: AuthDiagnosticFields = {}) {
   if (process.env.AUTH_DIAGNOSTICS !== "true") return;

   console.info(
      JSON.stringify({
         timestamp: new Date().toISOString(),
         scope: "auth",
         event,
         ...fields,
      }),
   );
}

export function authDiagnosticError(event: string, error: unknown, fields: AuthDiagnosticFields = {}) {
   authDiagnostic(event, {
      ...fields,
      outcome: "failure",
      errorType: error instanceof Error ? error.name : "UnknownError",
   });
}
