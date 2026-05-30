// // components/ViewReview.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { easeOut, motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// interface Review {
//    _id: string;
//    reviewName: string;
//    review: string;
//    image: string;
//    rating: number;
//    position: string;
// }

// // Fake data for demonstration
// const fakeReviews: Review[] = [
//    {
//       _id: "1",
//       reviewName: "Sarah Johnson",
//       review: "Absolutely amazing service! The team went above and beyond to deliver exceptional results. Highly recommended! The attention to detail and professionalism was outstanding.",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//       rating: 5,
//       position: "Marketing Director",
//    },
//    {
//       _id: "2",
//       reviewName: "Michael Chen",
//       review: "Outstanding quality and professionalism. The attention to detail and customer service is unmatched in the industry. Will definitely work with them again!",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       rating: 5,
//       position: "Product Manager",
//    },
//    {
//       _id: "3",
//       reviewName: "Emily Rodriguez",
//       review: "Transformative experience working with this team. They truly understand client needs and deliver beyond expectations. Exceptional work!",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//       rating: 4,
//       position: "Creative Director",
//    },
//    {
//       _id: "4",
//       reviewName: "David Kim",
//       review: "Professional, efficient, and delivered exactly what we needed. The communication was excellent throughout the entire process. Highly satisfied!",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//       rating: 5,
//       position: "Tech Lead",
//    },
//    {
//       _id: "5",
//       reviewName: "Jessica Williams",
//       review: "Outstanding results! The team understood our vision perfectly and delivered beyond our expectations. The quality of work is exceptional.",
//       image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
//       rating: 4,
//       position: "Brand Manager",
//    },
//    {
//       _id: "6",
//       reviewName: "Alex Thompson",
//       review: "Incredible experience from start to finish. The team is professional, creative, and delivers high-quality work on time. Highly recommended!",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
//       rating: 5,
//       position: "Startup Founder",
//    },
// ];

// const ViewReview = () => {
//    const [reviews, setReviews] = useState<Review[]>([]);
//    const [isLoading, setIsLoading] = useState(true);

//    useEffect(() => {
//       // Simulate API call
//       const timer = setTimeout(() => {
//          setReviews(fakeReviews);
//          setIsLoading(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//    }, []);

//    const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//          opacity: 1,
//          transition: {
//             staggerChildren: 0.2,
//          },
//       },
//    };

//    const itemVariants = {
//       hidden: { opacity: 0, y: 50 },
//       visible: {
//          opacity: 1,
//          y: 0,
//          transition: {
//             duration: 0.6,
//             ease: easeOut,
//          },
//       },
//    };

//    const renderStars = (rating: number) => {
//       return Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />);
//    };

//    // Loading State
//    if (isLoading) {
//       return (
//          <div className="min-h-screen bg-[#4b1614] dark:bg-[#4b1614] flex items-center justify-center">
//             <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
//                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//                <p className="text-white text-xl font-light">Loading amazing reviews...</p>
//             </motion.div>
//          </div>
//       );
//    }

//    return (
//       <div className=" container mx-auto md:rounded-t-2xl mb-1 bg-[#4b1614] dark:bg-[#4b1614] relative overflow-hidden">
//          {/* Animated Background Elements */}
//          <div className="absolute inset-0">
//             <motion.div
//                animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.1, 0.2, 0.1],
//                }}
//                transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                }}
//                className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
//             />
//             <motion.div
//                animate={{
//                   scale: [1.2, 1, 1.2],
//                   opacity: [0.15, 0.1, 0.15],
//                }}
//                transition={{
//                   duration: 6,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 1,
//                }}
//                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
//             />
//             <motion.div
//                animate={{
//                   scale: [1, 1.1, 1],
//                   opacity: [0.1, 0.15, 0.1],
//                }}
//                transition={{
//                   duration: 7,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 2,
//                }}
//                className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
//             />
//          </div>

//          <div className="relative z-10 py-20 px-4">
//             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
//                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients Say</span>
//                </motion.h2>
//                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-gray-300 max-w-2xl mx-auto">
//                   Discover why thousands of clients trust us with their projects and vision
//                </motion.p>
//             </motion.div>

//             <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto">
//                {reviews.length === 0 ? (
//                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white text-xl">
//                      No reviews yet. Be the first to leave a review!
//                   </motion.div>
//                ) : (
//                   <Swiper
//                      effect={"coverflow"}
//                      grabCursor={true}
//                      centeredSlides={true}
//                      slidesPerView={"auto"}
//                      coverflowEffect={{
//                         rotate: 0,
//                         stretch: 0,
//                         depth: 100,
//                         modifier: 2.5,
//                         slideShadows: true,
//                      }}
//                      speed={1500}
//                      pagination={{
//                         clickable: true,
//                         dynamicBullets: true,
//                      }}
//                      autoplay={{
//                         delay: 4000,
//                         disableOnInteraction: false,
//                      }}
//                      modules={[EffectCoverflow, Pagination, Autoplay]}
//                      className="modern-review-swiper"
//                      breakpoints={{
//                         320: {
//                            slidesPerView: 1,
//                            spaceBetween: 20,
//                         },
//                         768: {
//                            slidesPerView: 2,
//                            spaceBetween: 30,
//                         },
//                         1024: {
//                            slidesPerView: 3,
//                            spaceBetween: 40,
//                         },
//                      }}
//                   >
//                      {reviews.map((review) => (
//                         <SwiperSlide key={review._id}>
//                            <motion.div
//                               variants={itemVariants}
//                               whileHover={{
//                                  scale: 1.05,
//                                  y: -10,
//                                  transition: { duration: 0.3 },
//                               }}
//                               className="relative group h-full"
//                            >
//                               {/* Card */}
//                               <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
//                                  {/* Quote Icon */}
//                                  <motion.div
//                                     whileHover={{ rotate: 360 }}
//                                     transition={{ duration: 0.6 }}
//                                     className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
//                                  >
//                                     <Quote className="w-6 h-6 text-white" />
//                                  </motion.div>

//                                  {/* Rating */}
//                                  <div className="flex justify-center mb-6">
//                                     <div className="flex gap-1">{renderStars(review.rating)}</div>
//                                  </div>

//                                  {/* Review Text */}
//                                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-200 text-lg leading-relaxed mb-8 text-center italic flex-grow">
//                                     "{review.review}"
//                                  </motion.p>

//                                  {/* Reviewer Info */}
//                                  <div className="flex flex-col items-center mt-auto">
//                                     <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="relative mb-4">
//                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
//                                        <img src={review.image} alt={review.reviewName} className="relative w-20 h-20 rounded-full border-4 border-white/20 object-cover" />
//                                     </motion.div>

//                                     <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl font-semibold text-white mb-2 text-center">
//                                        {review.reviewName}
//                                     </motion.h3>

//                                     <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-purple-300 text-sm text-center">
//                                        {review.position}
//                                     </motion.p>
//                                  </div>
//                               </div>
//                            </motion.div>
//                         </SwiperSlide>
//                      ))}
//                   </Swiper>
//                )}
//             </motion.div>

//             {/* Stats Section */}
//             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
//                {[
//                   { number: "2K+", label: "Happy Clients" },
//                   { number: "4.9/5", label: "Avg Rating" },
//                   { number: "50+", label: "Countries" },
//                   { number: "24/7", label: "Support" },
//                ].map((stat, index) => (
//                   <motion.div
//                      key={stat.label}
//                      initial={{ opacity: 0, scale: 0.8 }}
//                      whileInView={{ opacity: 1, scale: 1 }}
//                      transition={{ duration: 0.5, delay: index * 0.1 }}
//                      whileHover={{
//                         scale: 1.05,
//                         y: -5,
//                         transition: { duration: 0.2 },
//                      }}
//                      className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
//                   >
//                      <motion.div
//                         initial={{ scale: 0 }}
//                         whileInView={{ scale: 1 }}
//                         transition={{
//                            type: "spring",
//                            stiffness: 200,
//                            delay: index * 0.1,
//                         }}
//                         className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2"
//                      >
//                         {stat.number}
//                      </motion.div>
//                      <div className="text-gray-400 text-sm">{stat.label}</div>
//                   </motion.div>
//                ))}
//             </motion.div>
//          </div>

//          <style jsx global>{`
//             .modern-review-swiper {
//                padding: 50px 20px 100px !important;
//             }

//             .modern-review-swiper .swiper-pagination-bullet {
//                width: 12px;
//                height: 12px;
//                background: rgba(255, 255, 255, 0.5);
//                opacity: 0.7;
//                transition: all 0.3s ease;
//             }

//             .modern-review-swiper .swiper-pagination-bullet-active {
//                background: linear-gradient(45deg, #a855f7, #ec4899);
//                opacity: 1;
//                transform: scale(1.2);
//             }

//             .swiper-slide {
//                transition: all 0.3s ease;
//             }

//             .swiper-slide-active {
//                transform: scale(1.05);
//             }
//          `}</style>
//       </div>
//    );
// };

// export default ViewReview;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
   _id: string;
   reviewName: string;
   review: string;
   image: string;
   rating: number;
   position: string;
}

const fakeReviews: Review[] = [
   {
      _id: "1",
      reviewName: "Sarah Johnson",
      review: "Exceptional attention to detail and professionalism. Delivered exactly what we envisioned — on time and above expectation. A developer who truly listens.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Marketing Director, Acme Co.",
   },
   {
      _id: "2",
      reviewName: "Michael Chen",
      review: "Outstanding quality. The codebase is clean, well-documented, and maintainable. Genuinely rare to find this combination of speed and craft.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Product Lead, Stripe",
   },
   {
      _id: "3",
      reviewName: "Emily Rodriguez",
      review: "Transformed our vague brief into a polished, production-ready product. The UI work alone was worth every penny. Will absolutely engage again.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Creative Director, Folio",
   },
   {
      _id: "4",
      reviewName: "David Kim",
      review: "Clear communication throughout. No surprises, no excuses — just results. The integration with our existing stack was seamless.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Tech Lead, Vercel",
   },
   {
      _id: "5",
      reviewName: "Jessica Williams",
      review: "Took our MVP from concept to live in three weeks. The quality of thought behind every component was immediately evident.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      position: "Founder, Basis Studio",
   },
   {
      _id: "6",
      reviewName: "Alex Thompson",
      review: "Hired for one project, retained for six months. That says everything. Consistently excellent — both the code and the collaboration.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "CTO, Momentum Labs",
   },
];

const ease = [0.22, 1, 0.36, 1] as const;
const VISIBLE = 3; // cards visible at once

const ViewReview = () => {
   const [reviews, setReviews] = useState<Review[]>([]);
   const [loading, setLoading] = useState(true);
   const [active, setActive] = useState(0);
   const [dir, setDir] = useState(1);

   useEffect(() => {
      const t = setTimeout(() => {
         setReviews(fakeReviews);
         setLoading(false);
      }, 800);
      return () => clearTimeout(t);
   }, []);

   // Auto-advance
   useEffect(() => {
      if (!reviews.length) return;
      const id = setInterval(() => {
         setDir(1);
         setActive((p) => (p + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(id);
   }, [reviews]);

   const prev = () => {
      setDir(-1);
      setActive((p) => (p === 0 ? reviews.length - 1 : p - 1));
   };
   const next = () => {
      setDir(1);
      setActive((p) => (p + 1) % reviews.length);
   };

   const stars = (r: number) => Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < r ? "fill-white/70 text-white/70" : "text-white/10"} />);

   // ── Loading ────────────────────────────────────────────────────────────────
   if (loading) {
      return (
         <div className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-2xl flex items-center justify-center py-28">
            <div className="text-center space-y-3">
               <div className="w-10 h-10 border border-white/10 border-t-white/40 rounded-full animate-spin mx-auto" />
               <p className="text-sm font-mono text-white/25">Loading reviews…</p>
            </div>
         </div>
      );
   }

   // Indices of the 3 visible cards (wrapping)
   const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (active + i) % reviews.length);

   return (
      <div className="relative w-full overflow-hidden bg-[#0A0A0A] border border-white/[0.06] ">
         {/* Noise */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
         />
         {/* Grid */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
         />

         <div className="relative z-10 px-6 md:px-12 py-16 md:py-20">
            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
               <div>
                  <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                     <Quote size={11} /> Client Reviews
                  </span>
                  <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
                     What clients
                     <br />
                     <span className="italic text-white/35">are saying</span>
                  </h2>
               </div>

               {/* Nav controls */}
               <div className="flex items-center gap-3">
                  <button
                     onClick={prev}
                     className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200"
                  >
                     <ChevronLeft size={16} />
                  </button>
                  <button
                     onClick={next}
                     className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200"
                  >
                     <ChevronRight size={16} />
                  </button>
               </div>
            </motion.div>

            {/* ── Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {visibleIndices.map((idx, position) => {
                  const review = reviews[idx];
                  const isFirst = position === 0;
                  return (
                     <motion.div
                        key={review._id + active}
                        initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease, delay: position * 0.07 }}
                        className={`group relative rounded-2xl border p-6 flex flex-col gap-5 transition-colors duration-300 ${
                           isFirst ? "border-white/[0.14] bg-white/[0.05]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]"
                        }`}
                     >
                        {/* Quote mark */}
                        <Quote size={20} className="text-white/10 flex-none" />

                        {/* Stars */}
                        <div className="flex gap-1">{stars(review.rating)}</div>

                        {/* Review text */}
                        <p className="text-sm font-mono text-white/45 leading-relaxed flex-1">"{review.review}"</p>

                        {/* Divider */}
                        <div className="h-px bg-white/[0.06]" />

                        {/* Reviewer */}
                        <div className="flex items-center gap-3">
                           <img src={review.image} alt={review.reviewName} className="w-9 h-9 rounded-full object-cover border border-white/10 flex-none" />
                           <div>
                              <p className="text-sm font-semibold text-white/70">{review.reviewName}</p>
                              <p className="text-[11px] font-mono text-white/25">{review.position}</p>
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </div>

            {/* ── Dots ── */}
            <div className="flex items-center justify-center gap-2 mt-8">
               {reviews.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => {
                        setDir(i > active ? 1 : -1);
                        setActive(i);
                     }}
                     className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-1.5 bg-white/50" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"}`}
                  />
               ))}
            </div>

            {/* ── Stats ── */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, ease, delay: 0.2 }}
               className="mt-14 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6"
            >
               {[
                  { n: "2K+", l: "Happy Clients" },
                  { n: "4.9", l: "Avg. Rating" },
                  { n: "50+", l: "Countries" },
                  { n: "24/7", l: "Support" },
               ].map((s, i) => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.07 }} className="text-center">
                     <p className="text-3xl font-bold text-white/75 tracking-tight mb-1">{s.n}</p>
                     <p className="text-xs font-mono text-white/25 uppercase tracking-widest">{s.l}</p>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </div>
   );
};

export default ViewReview;
