
// import * as React from "react"

// const MOBILE_BREAKPOINT = 1024

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean>(
//     typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
//   )

//   React.useEffect(() => {
//     if (typeof window === 'undefined') return

//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
//     }

//     window.addEventListener('resize', checkMobile)
//     checkMobile() // Initial check
    
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   return isMobile
// }


import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

   React.useEffect(() => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
         setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };
      mql.addEventListener("change", onChange);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      return () => mql.removeEventListener("change", onChange);
   }, []);

   return !!isMobile;
}
