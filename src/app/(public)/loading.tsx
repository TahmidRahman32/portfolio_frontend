export default function Loading() {
   return (
      <div role="status" aria-label="Loading page" className="min-h-dvh bg-[#0A0A0A]">
         <div aria-hidden="true" className="h-px w-full bg-white/[0.04]">
            <div className="h-full w-1/3 bg-[#bd9520]/60" />
         </div>
      </div>
   );
}
