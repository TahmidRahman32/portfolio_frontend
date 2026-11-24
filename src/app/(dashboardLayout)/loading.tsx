export default function DashboardLoading() {
   return (
      <main role="status" aria-live="polite" className="min-h-dvh bg-[#080808] px-5 py-8 text-white">
         <span className="sr-only">Loading dashboard</span>
         <div className="mx-auto max-w-7xl animate-pulse space-y-5">
            <div className="h-14 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
               <div className="min-h-72 rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
               <div className="space-y-5 lg:col-span-3">
                  <div className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
                  <div className="h-72 rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
               </div>
            </div>
         </div>
      </main>
   );
}
