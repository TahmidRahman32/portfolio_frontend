// "use client";

// import React, { useState, useRef, useLayoutEffect } from "react";
// import { gsap } from "gsap";
// import { useRouter, usePathname } from "next/navigation";

// interface SparkleNavbarProps {
//    items: string[];
//    routes: string[];
//    color?: string;
//    activeIndex?: number;
//    onItemClick?: (index: number, item: string, route: string) => void;
// }

// const SparkleNavbar: React.FC<SparkleNavbarProps> = ({ items, routes, color = "#00fffc", activeIndex: externalActiveIndex, onItemClick }) => {
//    const router = useRouter();
//    const pathname = usePathname();

//    // Calculate initial active index based on current route
//    const getInitialActiveIndex = () => {
//       if (externalActiveIndex !== undefined) return externalActiveIndex;

//       const currentPath = pathname;
//       const index = routes.findIndex((route) => route === currentPath);
//       return index >= 0 ? index : 0;
//    };

//    const [internalActiveIndex, setInternalActiveIndex] = useState(getInitialActiveIndex);
//    const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

//    const navRef = useRef<HTMLDivElement>(null);
//    const activeElementRef = useRef<HTMLDivElement>(null);
//    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

//    // Update active index when route changes
//   useLayoutEffect(() => {
//      const newActiveIndex = getInitialActiveIndex();

//      if (newActiveIndex !== internalActiveIndex) {
//         queueMicrotask(() => {
//            setInternalActiveIndex(newActiveIndex);
//         });
//      }
//   }, [pathname, externalActiveIndex, getInitialActiveIndex, internalActiveIndex]);

//    // Function to create the SVG content for the active element.
//    const createSVG = (element: HTMLDivElement) => {
//       element.innerHTML = `
//       <!-- Your SVG content here (same as before) -->
//     `;
//    };

//    const getOffsetLeft = (element: HTMLButtonElement) => {
//       if (!navRef.current || !activeElementRef.current) return 0;
//       const elementRect = element.getBoundingClientRect();
//       const navRect = navRef.current.getBoundingClientRect();
//       const activeElementWidth = activeElementRef.current.offsetWidth;
//       return elementRect.left - navRect.left + (elementRect.width - activeElementWidth) / 2;
//    };

//    useLayoutEffect(() => {
//       const activeButton = buttonRefs.current[activeIndex];
//       if (navRef.current && activeElementRef.current && activeButton) {
//          gsap.set(activeElementRef.current, {
//             x: getOffsetLeft(activeButton),
//          });
//          gsap.to(activeElementRef.current, {
//             "--active-element-show": "1",
//             duration: 0.2,
//          });
//       }
//    }, [activeIndex]);

//    // FIXED: Proper navigation handling
//    const handleClick = (index: number) => {
//       const navElement = navRef.current;
//       const activeElement = activeElementRef.current;
//       const oldButton = buttonRefs.current[activeIndex];
//       const newButton = buttonRefs.current[index];

//       if (index === activeIndex || !navElement || !activeElement || !oldButton || !newButton) {
//          return;
//       }

//       const targetRoute = routes[index];

//       // Call the external click handler if provided
//       if (onItemClick) {
//          onItemClick(index, items[index], targetRoute);
//       } else {
//          // Navigate to the route using Next.js router
//          console.log(`Navigating to: ${targetRoute}`); // Debug log
//          router.push(targetRoute);
//       }

//       // Animation logic (keep your existing animation code)
//       const x = getOffsetLeft(newButton);
//       const direction = index > activeIndex ? "after" : "before";
//       const spacing = Math.abs(x - getOffsetLeft(oldButton));

//       navElement.classList.add(direction);

//       gsap.set(activeElement, {
//          rotateY: direction === "before" ? "180deg" : "0deg",
//       });

//       gsap.to(activeElement, {
//          keyframes: [
//             {
//                "--active-element-width": `${spacing > navElement.offsetWidth - 60 ? navElement.offsetWidth - 60 : spacing}px`,
//                duration: 0.3,
//                ease: "none",
//                onStart: () => {
//                   createSVG(activeElement);
//                   gsap.to(activeElement, {
//                      "--active-element-opacity": 1,
//                      duration: 0.1,
//                   });
//                },
//             },
//             {
//                "--active-element-scale-x": "0",
//                "--active-element-scale-y": ".25",
//                "--active-element-width": "0px",
//                duration: 0.3,
//                onStart: () => {
//                   gsap.to(activeElement, {
//                      "--active-element-mask-position": "40%",
//                      duration: 0.5,
//                   });
//                   gsap.to(activeElement, {
//                      "--active-element-opacity": 0,
//                      delay: 0.45,
//                      duration: 0.25,
//                   });
//                },
//                onComplete: () => {
//                   activeElement.innerHTML = "";
//                   navElement.classList.remove("before", "after");
//                   gsap.set(activeElement, {
//                      x: getOffsetLeft(newButton),
//                      "--active-element-show": "1",
//                   });
//                   // Update state only if not externally controlled
//                   if (externalActiveIndex === undefined) {
//                      setInternalActiveIndex(index);
//                   }
//                },
//             },
//          ],
//       });

//       gsap.to(activeElement, {
//          x,
//          "--active-element-strike-x": "-50%",
//          duration: 0.6,
//          ease: "none",
//       });
//    };

//    return (
//       <>
//          <style>{`
//         .navigation-menu {
//           margin: 20px 0px;
//           position: relative;
//           z-index: 1;
//         }

//         .navigation-menu ul {
//           margin: 0;
//           padding: 0;
//           list-style: none;
//           display: flex;
//           gap: 40px;
//         }

//         .navigation-menu ul li button {
//           -webkit-appearance: none;
//           -moz-appearance: none;
//           appearance: none;
//           border: none;
//           cursor: pointer;
//           background-color: transparent;
//           padding: 0;
//           margin: 0;
//           line-height: 22px;
//           transition: color 0.25s;
//           color: inherit;
//         }

//         .navigation-menu ul li:not(.active):hover button {
//           text-shadow: 0 0 10px ${color}, 0 0 20px ${color};
//         }

//         .navigation-menu .active-element {
//           --active-element-scale-x: 1;
//           --active-element-scale-y: 1;
//           --active-element-show: 0;
//           --active-element-opacity: 0;
//           --active-element-width: 0px;
//           --active-element-strike-x: 0%;
//           --active-element-mask-position: 0%;
//           position: absolute;
//           left: 0;
//           top: 34px;
//           height: 3px;
//           width: 36px;
//           border-radius: 2px;
//           background-color: ${color};
//           opacity: var(--active-element-show);
//         }

//         /* Rest of your CSS styles */
//       `}</style>

//          <nav className="navigation-menu" ref={navRef}>
//             <ul>
//                {items.map((item, index) => (
//                   <li key={item} className={index === activeIndex ? "active" : ""}>
//                      <button
//                         ref={(el) => {
//                            buttonRefs.current[index] = el;
//                         }}
//                         onClick={() => handleClick(index)}
//                         className="text-foreground"
//                      >
//                         {item}
//                      </button>
//                   </li>
//                ))}
//             </ul>
//             <div className="active-element" ref={activeElementRef} />
//          </nav>
//       </>
//    );
// };

// export default SparkleNavbar;

// "use client";

// import React, { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
// import { gsap } from "gsap";
// import { useRouter, usePathname } from "next/navigation";

// interface SparkleNavbarProps {
//    items: string[];
//    routes: string[];
//    color?: string;
//    activeIndex?: number;
//    onItemClick?: (index: number, item: string, route: string) => void;
//    className?: string;
// }

// const SparkleNavbar: React.FC<SparkleNavbarProps> = ({ items, routes, color = "#00fffc", activeIndex: externalActiveIndex, onItemClick, className = "" }) => {
//    const router = useRouter();
//    const pathname = usePathname();

//    // Memoized initial active index calculation
//    const getInitialActiveIndex = useCallback(() => {
//       if (externalActiveIndex !== undefined) return externalActiveIndex;
//       const currentPath = pathname;
//       const index = routes.findIndex((route) => route === currentPath);
//       return index >= 0 ? index : 0;
//    }, [externalActiveIndex, pathname, routes]);

//    const [internalActiveIndex, setInternalActiveIndex] = useState(getInitialActiveIndex());
//    const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

//    const navRef = useRef<HTMLDivElement>(null);
//    const activeElementRef = useRef<HTMLDivElement>(null);
//    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

//    // Track animation state to prevent multiple simultaneous animations
//    const isAnimatingRef = useRef(false);

//    // Update active index when route changes
//    useLayoutEffect(() => {
//       const newActiveIndex = getInitialActiveIndex();

//       if (newActiveIndex !== internalActiveIndex) {
//          queueMicrotask(() => {
//             setInternalActiveIndex(newActiveIndex);
//          });
//       }
//    }, [pathname, externalActiveIndex, getInitialActiveIndex, internalActiveIndex]);

//    // Get offset position for button
//    const getOffsetLeft = useCallback((element: HTMLButtonElement) => {
//       if (!navRef.current || !activeElementRef.current) return 0;
//       const elementRect = element.getBoundingClientRect();
//       const navRect = navRef.current.getBoundingClientRect();
//       const activeElementWidth = activeElementRef.current.offsetWidth;
//       return elementRect.left - navRect.left + (elementRect.width - activeElementWidth) / 2;
//    }, []);

//    // Position active element
//    useLayoutEffect(() => {
//       const activeButton = buttonRefs.current[activeIndex];
//       if (navRef.current && activeElementRef.current && activeButton && !isAnimatingRef.current) {
//          gsap.to(activeElementRef.current, {
//             x: getOffsetLeft(activeButton),
//             duration: 0.4,
//             ease: "power2.out",
//          });
//       }
//    }, [activeIndex, getOffsetLeft]);

//    // Handle click with smooth animation
//    const handleClick = useCallback(
//       (index: number) => {
//          const navElement = navRef.current;
//          const activeElement = activeElementRef.current;
//          const oldButton = buttonRefs.current[activeIndex];
//          const newButton = buttonRefs.current[index];

//          if (index === activeIndex || !navElement || !activeElement || !oldButton || !newButton || isAnimatingRef.current) {
//             return;
//          }

//          isAnimatingRef.current = true;
//          const targetRoute = routes[index];

//          // Call the external click handler if provided
//          if (onItemClick) {
//             onItemClick(index, items[index], targetRoute);
//          } else {
//             // Navigate to the route using Next.js router
//             router.push(targetRoute);
//          }

//          // Calculate animation parameters
//          const oldX = getOffsetLeft(oldButton);
//          const newX = getOffsetLeft(newButton);
//          const direction = index > activeIndex ? "right" : "left";
//          const distance = Math.abs(newX - oldX);

//          // Smooth morphing animation
//          const timeline = gsap.timeline({
//             onComplete: () => {
//                isAnimatingRef.current = false;
//                if (externalActiveIndex === undefined) {
//                   setInternalActiveIndex(index);
//                }
//             },
//          });

//          // Phase 1: Expand width
//          timeline.to(
//             activeElement,
//             {
//                width: distance + 40,
//                duration: 0.25,
//                ease: "power2.inOut",
//             },
//             0,
//          );

//          // Phase 2: Move position while maintaining width
//          timeline.to(
//             activeElement,
//             {
//                x: newX,
//                duration: 0.35,
//                ease: "power2.inOut",
//             },
//             0.1,
//          );

//          // Phase 3: Contract back to normal width
//          timeline.to(
//             activeElement,
//             {
//                width: 36,
//                duration: 0.25,
//                ease: "power2.inOut",
//             },
//             0.3,
//          );

//          // Update state
//          if (externalActiveIndex === undefined) {
//             queueMicrotask(() => {
//                setInternalActiveIndex(index);
//             });
//          }
//       },
//       [activeIndex, routes, items, onItemClick, router, getOffsetLeft, externalActiveIndex],
//    );

//    const styles = useMemo(
//       () => `
//          .navigation-menu {
//             position: relative;
//             z-index: 10;
//          }

//          .navigation-menu ul {
//             margin: 0;
//             padding: 0;
//             list-style: none;
//             display: flex;
//             gap: 2rem;
//             position: relative;
//          }

//          .navigation-menu ul li {
//             position: relative;
//          }

//          .navigation-menu ul li button {
//             -webkit-appearance: none;
//             -moz-appearance: none;
//             appearance: none;
//             border: none;
//             cursor: pointer;
//             background-color: transparent;
//             padding: 0.5rem 0;
//             margin: 0;
//             line-height: 1.5rem;
//             font-size: 1rem;
//             font-weight: 500;
//             transition: color 0.25s ease;
//             color: inherit;
//             position: relative;
//             white-space: nowrap;
//          }

//          .navigation-menu ul li button::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background: linear-gradient(90deg, ${color}, transparent);
//             transition: width 0.25s ease;
//          }

//          .navigation-menu ul li button:hover::after {
//             width: 100%;
//          }

//          .navigation-menu ul li:not(.active):hover button {
//             text-shadow: 0 0 8px ${color}, 0 0 16px ${color}40;
//             color: ${color};
//             transition: all 0.25s ease;
//          }

//          .navigation-menu .active-element {
//             position: absolute;
//             left: 0;
//             bottom: -8px;
//             height: 3px;
//             width: 36px;
//             border-radius: 2px;
//             background: linear-gradient(90deg, ${color}, ${color}80);
//             box-shadow: 0 0 10px ${color}60, 0 0 20px ${color}40;
//             will-change: transform, width;
//             pointer-events: none;
//          }

//          .navigation-menu ul li.active button {
//             color: ${color};
//             font-weight: 600;
//          }

//          @media (max-width: 768px) {
//             .navigation-menu ul {
//                gap: 1rem;
//             }

//             .navigation-menu ul li button {
//                font-size: 0.875rem;
//                padding: 0.375rem 0;
//             }
//          }
//       `,
//       [color],
//    );

//    return (
//       <>
//          <style>{styles}</style>

//          <nav ref={navRef} className={`navigation-menu ${className}`}>
//             <ul>
//                {items.map((item, index) => (
//                   <li key={`${item}-${index}`} className={index === activeIndex ? "active" : ""}>
//                      <button
//                         ref={(el) => {
//                            buttonRefs.current[index] = el;
//                         }}
//                         onClick={() => handleClick(index)}
//                         aria-current={index === activeIndex ? "page" : undefined}
//                      >
//                         {item}
//                      </button>
//                   </li>
//                ))}
//             </ul>
//             <div className="active-element" ref={activeElementRef} style={{ transform: `translateX(0px)` }} />
//          </nav>
//       </>
//    );
// };

// export default SparkleNavbar;

// "use client";

// import React, { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
// import { gsap } from "gsap";
// import { useRouter, usePathname } from "next/navigation";

// interface SparkleNavbarProps {
//    items: string[];
//    routes: string[];
//    color?: string;
//    activeIndex?: number;
//    onItemClick?: (index: number, item: string, route: string) => void;
//    className?: string;
// }

// const SparkleNavbar: React.FC<SparkleNavbarProps> = ({ items, routes, color = "#00fffc", activeIndex: externalActiveIndex, onItemClick, className = "" }) => {
//    const router = useRouter();
//    const pathname = usePathname();

//    const getInitialActiveIndex = useCallback(() => {
//       if (externalActiveIndex !== undefined) return externalActiveIndex;
//       const currentPath = pathname;
//       const index = routes.findIndex((route) => route === currentPath);
//       return index >= 0 ? index : 0;
//    }, [externalActiveIndex, pathname, routes]);

//    const [internalActiveIndex, setInternalActiveIndex] = useState(getInitialActiveIndex());
//    const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

//    const navRef = useRef<HTMLDivElement>(null);
//    const activeElementRef = useRef<HTMLDivElement>(null);
//    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
//    const hoverElementRef = useRef<HTMLDivElement>(null);
//    const isAnimatingRef = useRef(false);

//    // Update active index when route changes
//    useLayoutEffect(() => {
//       const newActiveIndex = getInitialActiveIndex();
//       if (newActiveIndex !== internalActiveIndex) {
//          queueMicrotask(() => {
//             setInternalActiveIndex(newActiveIndex);
//          });
//       }
//    }, [pathname, externalActiveIndex, getInitialActiveIndex, internalActiveIndex]);

//    // Get offset position for button
//    const getOffsetLeft = useCallback((element: HTMLButtonElement) => {
//       if (!navRef.current) return 0;
//       const elementRect = element.getBoundingClientRect();
//       const navRect = navRef.current.getBoundingClientRect();
//       return elementRect.left - navRect.left;
//    }, []);

//    // Position active element on mount and when index changes
//    useLayoutEffect(() => {
//       const activeButton = buttonRefs.current[activeIndex];
//       if (navRef.current && activeElementRef.current && activeButton && !isAnimatingRef.current) {
//          const offset = getOffsetLeft(activeButton);
//          const width = activeButton.offsetWidth;

//          gsap.to(activeElementRef.current, {
//             x: offset,
//             width: width,
//             duration: 0.5,
//             ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//             overwrite: "auto",
//          });
//       }
//    }, [activeIndex, getOffsetLeft]);

//    // Handle hover animation
//    const handleMouseEnter = useCallback(
//       (index: number) => {
//          const button = buttonRefs.current[index];
//          if (!button || !hoverElementRef.current) return;

//          const offset = getOffsetLeft(button);
//          const width = button.offsetWidth;

//          gsap.to(hoverElementRef.current, {
//             x: offset,
//             width: width,
//             opacity: 0.6,
//             duration: 0.3,
//             ease: "power2.out",
//             overwrite: "auto",
//          });
//       },
//       [getOffsetLeft],
//    );

//    // Handle hover leave animation
//    const handleMouseLeave = useCallback(() => {
//       if (!hoverElementRef.current) return;

//       gsap.to(hoverElementRef.current, {
//          opacity: 0,
//          duration: 0.2,
//          ease: "power2.out",
//          overwrite: "auto",
//       });
//    }, []);

//    // Handle click with smooth animation
//    const handleClick = useCallback(
//       (index: number) => {
//          const activeElement = activeElementRef.current;
//          const oldButton = buttonRefs.current[activeIndex];
//          const newButton = buttonRefs.current[index];

//          if (index === activeIndex || !activeElement || !oldButton || !newButton || isAnimatingRef.current) {
//             return;
//          }

//          isAnimatingRef.current = true;
//          const targetRoute = routes[index];

//          if (onItemClick) {
//             onItemClick(index, items[index], targetRoute);
//          } else {
//             router.push(targetRoute);
//          }

//          // Smooth animation to new position
//          const oldOffset = getOffsetLeft(oldButton);
//          const newOffset = getOffsetLeft(newButton);
//          const newWidth = newButton.offsetWidth;

//          // Create smooth transition
//          gsap.to(activeElement, {
//             x: newOffset,
//             width: newWidth,
//             duration: 0.6,
//             ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//             onComplete: () => {
//                isAnimatingRef.current = false;
//                if (externalActiveIndex === undefined) {
//                   setInternalActiveIndex(index);
//                }
//             },
//          });

//          // Fade out hover element
//          if (hoverElementRef.current) {
//             gsap.to(hoverElementRef.current, {
//                opacity: 0,
//                duration: 0.2,
//             });
//          }

//          // Update state
//          if (externalActiveIndex === undefined) {
//             queueMicrotask(() => {
//                setInternalActiveIndex(index);
//             });
//          }
//       },
//       [activeIndex, routes, items, onItemClick, router, getOffsetLeft, externalActiveIndex],
//    );

//    const styles = useMemo(
//       () => `
//          .navigation-menu {
//             position: relative;
//             z-index: 10;
//             perspective: 1000px;
//          }

//          .navigation-menu ul {
//             margin: 0;
//             padding: 0;
//             list-style: none;
//             display: flex;
//             gap: 0.5rem;
//             position: relative;
//             background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
//             padding: 0.75rem 1rem;
//             border-radius: 0.75rem;
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255,255,255,0.08);
//          }

//          .navigation-menu ul li {
//             position: relative;
//             flex: 1;
//             min-width: max-content;
//          }

//          .navigation-menu ul li button {
//             -webkit-appearance: none;
//             -moz-appearance: none;
//             appearance: none;
//             border: none;
//             cursor: pointer;
//             background-color: transparent;
//             padding: 0.5rem 1rem;
//             margin: 0;
//             line-height: 1.5rem;
//             font-size: 0.95rem;
//             font-weight: 500;
//             transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//             color: rgba(255,255,255,0.7);
//             position: relative;
//             white-space: nowrap;
//             z-index: 2;
//          }

//          .navigation-menu ul li button:hover {
//             color: ${color};
//             text-shadow: 0 0 10px ${color}80, 0 0 20px ${color}40;
//             transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//          }

//          .navigation-menu ul li.active button {
//             color: ${color};
//             font-weight: 600;
//             text-shadow: 0 0 8px ${color}60;
//          }

//          .navigation-menu .hover-element {
//             position: absolute;
//             left: 0;
//             top: 50%;
//             transform: translateY(-50%);
//             height: 2.5rem;
//             border-radius: 0.5rem;
//             background: linear-gradient(135deg, ${color}20 0%, ${color}10 100%);
//             border: 1px solid ${color}40;
//             box-shadow: 0 0 15px ${color}20;
//             opacity: 0;
//             pointer-events: none;
//             z-index: 1;
//             will-change: transform, width, opacity;
//          }

//          .navigation-menu .active-element {
//             position: absolute;
//             left: 0;
//             top: 50%;
//             transform: translateY(-50%);
//             height: 100%;
//             border-radius: 0.5rem;
//             background: linear-gradient(135deg, ${color} 0%, ${color}80 100%);
//             box-shadow: 0 0 20px ${color}60, inset 0 0 20px ${color}30;
//             pointer-events: none;
//             z-index: 1;
//             will-change: transform, width;
//          }

//          @media (max-width: 768px) {
//             .navigation-menu ul {
//                gap: 0.25rem;
//                padding: 0.5rem 0.5rem;
//             }

//             .navigation-menu ul li button {
//                font-size: 0.8rem;
//                padding: 0.375rem 0.75rem;
//             }

//             .navigation-menu .active-element {
//                height: 2rem;
//             }

//             .navigation-menu .hover-element {
//                height: 2rem;
//             }
//          }

//          @supports (backdrop-filter: blur(10px)) {
//             .navigation-menu ul {
//                background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
//             }
//          }
//       `,
//       [color],
//    );

//    return (
//       <>
//          <style>{styles}</style>

//          <nav ref={navRef} className={`navigation-menu ${className}`}>
//             <ul>
//                {/* Hover element (appears on hover) */}
//                <div
//                   className="hover-element"
//                   ref={hoverElementRef}
//                   style={{
//                      transform: "translateY(-50%)",
//                   }}
//                />

//                {/* Active element (shows current active state) */}
//                <div
//                   className="active-element"
//                   ref={activeElementRef}
//                   style={{
//                      transform: "translateY(-50%)",
//                   }}
//                />

//                {/* Navigation items */}
//                {items.map((item, index) => (
//                   <li key={`${item}-${index}`} className={index === activeIndex ? "active" : ""} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
//                      <button
//                         ref={(el) => {
//                            buttonRefs.current[index] = el;
//                         }}
//                         onClick={() => handleClick(index)}
//                         aria-current={index === activeIndex ? "page" : undefined}
//                         className="relative z-10"
//                      >
//                         {item}
//                      </button>
//                   </li>
//                ))}
//             </ul>
//          </nav>
//       </>
//    );
// };

// export default SparkleNavbar;

"use client";

import React, {
  useState, useRef, useLayoutEffect, useCallback, useMemo,
} from "react";
import { gsap } from "gsap";
import { useRouter, usePathname } from "next/navigation";

interface SparkleNavbarProps {
  items: string[];
  routes: string[];
  color?: string;
  activeIndex?: number;
  onItemClick?: (index: number, item: string, route: string) => void;
  className?: string;
}

const SparkleNavbar: React.FC<SparkleNavbarProps> = ({
  items,
  routes,
  color = "#ffffff",
  activeIndex: externalActiveIndex,
  onItemClick,
  className = "",
}) => {
  const router   = useRouter();
  const pathname = usePathname();

  // ── Active index ────────────────────────────────────────────────────────────
  const getInitialIndex = useCallback(() => {
    if (externalActiveIndex !== undefined) return externalActiveIndex;
    const idx = routes.findIndex((r) => r === pathname);
    return idx >= 0 ? idx : 0;
  }, [externalActiveIndex, pathname, routes]);

  const [internalIdx, setInternalIdx] = useState(getInitialIndex);
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalIdx;

  // ── Refs ────────────────────────────────────────────────────────────────────
  const navRef        = useRef<HTMLDivElement>(null);
  const underlineRef  = useRef<HTMLDivElement>(null);  // active underline
  const hoverLineRef  = useRef<HTMLDivElement>(null);  // hover underline
  const glowRef       = useRef<HTMLDivElement>(null);  // hover glow pill
  const buttonRefs    = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimating   = useRef(false);

  // ── Sync on pathname change ─────────────────────────────────────────────────
  useLayoutEffect(() => {
    const next = getInitialIndex();
    if (next !== internalIdx) queueMicrotask(() => setInternalIdx(next));
  }, [pathname, externalActiveIndex, getInitialIndex, internalIdx]);

  // ── Helper: get button position relative to nav ─────────────────────────────
  const getBtnRect = useCallback((btn: HTMLButtonElement) => {
    const navRect = navRef.current!.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    return {
      left:  btnRect.left - navRect.left,
      width: btnRect.width,
    };
  }, []);

  // ── Position active underline on mount / index change ───────────────────────
  useLayoutEffect(() => {
    const btn = buttonRefs.current[activeIndex];
    const ul  = underlineRef.current;
    if (!btn || !ul || !navRef.current) return;
    const { left, width } = getBtnRect(btn);
    gsap.to(ul, {
      x: left,
      width,
      duration: isAnimating.current ? 0 : 0,   // instant on first mount
      ease: "power3.out",
      overwrite: "auto",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount — clicks handle their own animation

  // ── Click handler ───────────────────────────────────────────────────────────
  const handleClick = useCallback((index: number) => {
    if (index === activeIndex || isAnimating.current) return;

    const newBtn = buttonRefs.current[index];
    const ul     = underlineRef.current;
    if (!newBtn || !ul || !navRef.current) return;

    isAnimating.current = true;
    const { left, width } = getBtnRect(newBtn);

    if (onItemClick) {
      onItemClick(index, items[index], routes[index]);
    } else {
      router.push(routes[index]);
    }

    gsap.to(ul, {
      x: left,
      width,
      duration: 0.55,
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => {
        isAnimating.current = false;
        if (externalActiveIndex === undefined) setInternalIdx(index);
      },
    });

    // Briefly thicken the underline during travel
    gsap.timeline()
      .to(ul, { height: 2.5, duration: 0.18, ease: "power2.out" })
      .to(ul, { height: 1,   duration: 0.22, ease: "power2.in" });

    if (externalActiveIndex === undefined) queueMicrotask(() => setInternalIdx(index));
  }, [activeIndex, getBtnRect, items, routes, onItemClick, router, externalActiveIndex]);

  // ── Hover in ────────────────────────────────────────────────────────────────
  const handleMouseEnter = useCallback((index: number) => {
    const btn = buttonRefs.current[index];
    const hl  = hoverLineRef.current;
    const gl  = glowRef.current;
    if (!btn || !hl || !gl || !navRef.current) return;
    const { left, width } = getBtnRect(btn);

    gsap.to(hl, { x: left, width, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    gsap.to(gl, { x: left, width, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });

    // Glow text
    const btnEl = btn;
    gsap.to(btnEl, { textShadow: `0 0 14px ${color}90`, duration: 0.25, overwrite: "auto" });
  }, [getBtnRect, color]);

  // ── Hover out ───────────────────────────────────────────────────────────────
  const handleMouseLeave = useCallback((index: number) => {
    const btn = buttonRefs.current[index];
    if (!btn || !hoverLineRef.current || !glowRef.current) return;
    gsap.to(hoverLineRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
    gsap.to(glowRef.current,      { opacity: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
    gsap.to(btn, { textShadow: "none", duration: 0.25, overwrite: "auto" });
  }, []);

  // ── Injected CSS ────────────────────────────────────────────────────────────
  const css = useMemo(() => `
    .snav-wrap {
      position: relative;
      display: inline-block;
    }
    .snav-list {
      margin: 0;
      padding: 8px 16px;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 0;
      position: relative;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .snav-item {
      position: relative;
      flex: none;
    }
    .snav-btn {
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 8px 18px;
      font-size: 0.82rem;
      font-family: 'Montserrat', ui-sans-serif, sans-serif;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      transition: color 0.25s ease;
      white-space: nowrap;
      position: relative;
      z-index: 3;
      line-height: 1;
    }
    .snav-btn:hover {
      color: rgba(255,255,255,0.85);
    }
    .snav-item.active .snav-btn {
      color: rgba(255,255,255,0.90);
      font-weight: 600;
    }

    /* ── Underlines & glow pill — positioned absolutely inside list ── */
    .snav-hover-line,
    .snav-active-line {
      position: absolute;
      bottom: 4px;
      left: 0;
      height: 1px;
      border-radius: 9999px;
      pointer-events: none;
      z-index: 4;
      will-change: transform, width, opacity;
    }
    .snav-hover-line {
      background: rgba(255,255,255,0.25);
      opacity: 0;
    }
    .snav-active-line {
      background: ${color};
      box-shadow: 0 0 8px ${color}80, 0 0 18px ${color}40;
      height: 1px;
      opacity: 1;
    }
    .snav-glow {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 32px;
      border-radius: 10px;
      background: radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 80%);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      will-change: transform, width, opacity;
    }

    @media (max-width: 640px) {
      .snav-list { gap: 0; padding: 6px 8px; }
      .snav-btn  { padding: 6px 12px; font-size: 0.72rem; }
    }
  `, [color]);

  return (
    <>
      <style>{css}</style>

      <div ref={navRef} className={`snav-wrap ${className}`}>
        <ul className="snav-list">
          {/* Hover glow pill */}
          <div ref={glowRef} className="snav-glow" />

          {/* Hover underline */}
          <div ref={hoverLineRef} className="snav-hover-line" />

          {/* Active underline */}
          <div ref={underlineRef} className="snav-active-line" />

          {/* Items */}
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className={`snav-item ${i === activeIndex ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <button
                ref={(el) => { buttonRefs.current[i] = el; }}
                onClick={() => handleClick(i)}
                aria-current={i === activeIndex ? "page" : undefined}
                className="snav-btn"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SparkleNavbar;