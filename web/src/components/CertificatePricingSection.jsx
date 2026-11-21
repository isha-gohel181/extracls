import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { CERTIFICATE_DEFAULT_IMAGE } from '../constants/brand'
import { useLanguage } from '../context/LanguageContext'
import { resolveCourseThumbnail } from '../utils/courseThumbnail'

gsap.registerPlugin(ScrollTrigger)

const CertificatePricingSection = ({ course }) => {
   const { t } = useLanguage()
   const [selectedPlanId, setSelectedPlanId] = useState(null)
   const containerRef = useRef(null)
   const navigate = useNavigate()

   const certificateSrc = resolveCourseThumbnail(course?.certificateImage) || CERTIFICATE_DEFAULT_IMAGE

   useEffect(() => {
      const ctx = gsap.context(() => {
         gsap.from('.reveal-item', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
               trigger: containerRef.current,
               start: 'top 80%',
            }
         })
      }, containerRef)
      return () => ctx.revert()
   }, [])

   const dynamicCoursePrice = (course?.salePrice && Number(course.salePrice) > 0)
      ? Number(course.salePrice)
      : (course?.price && Number(course.price) > 0 ? Number(course.price) : 1499);

   const originalPrice = (course?.price && Number(course.price) > dynamicCoursePrice)
      ? Number(course.price)
      : null;

   const apiPlans = course?.plans?.length > 0 ? course.plans.map(p => {
      const pSale = p.salePrice && Number(p.salePrice) > 0 ? Number(p.salePrice) : null;
      const pPrice = p.price && Number(p.price) > 0 ? Number(p.price) : null;
      const planPrice = pSale || pPrice || dynamicCoursePrice;
      return {
         id: p._id,
         title: p.name || `${p.duration || 1} ${p.durationType || 'Year'}`,
         price: planPrice,
         subtitle: p.description || 'Full Access Program'
      };
   }) : [
      {
         id: 'full-program',
         title: course?.title ? `${course.title} - Complete Access` : 'Complete Program Access',
         price: dynamicCoursePrice,
         originalPrice: originalPrice,
         subtitle: 'All live batches, physical study kit & certified completion certificate'
      }
   ];

   useEffect(() => {
      if (apiPlans.length > 0 && !selectedPlanId) {
         setSelectedPlanId(apiPlans[0].id)
      }
   }, [apiPlans, selectedPlanId])

   const handleContinue = () => {
      const selectedPlan = apiPlans.find(p => p.id === selectedPlanId)
      if (selectedPlan) {
         navigate('/checkout', { state: { plan: selectedPlan, course } })
      }
   }

   return (
      <section id="pricing" ref={containerRef} className="max-w-7xl mx-auto py-10 lg:py-20 scroll-mt-24 px-4 sm:px-6">

         <div className="text-center mb-10 lg:mb-20 reveal-item">
            <h2 className="font-newsreader italic text-[clamp(2.5rem,6vw,4.5rem)] text-slate-900 font-extralight tracking-tighter leading-tight">
               Enrollment & <span className="text-[#1a5f9e] underline decoration-[#55B8F5]/30">Certification.</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            <div className="lg:col-span-6 reveal-item relative group lg:sticky lg:top-32">
               <div className="relative bg-white p-2 shadow-xl border border-[#E2EAF3] overflow-hidden rounded-2xl">
                  <img
                     src={certificateSrc}
                     alt="EXTRACLS Certificate of Completion"
                     className="w-full h-auto transition-all duration-700 rounded-xl"
                  />
               </div>
               <div className="mt-6 space-y-2 text-center lg:text-left">
                  <p className="font-jetbrains text-[10px] text-[#1a5f9e] tracking-[0.3em] uppercase font-bold">
                     {course?.certificateTitle || "Certificate of Completion"}
                  </p>
                  <p className="font-montserrat text-xs text-[#64748B]">
                     Official accredited certificate issued upon successful completion of all course modules and assessments.
                  </p>
               </div>
            </div>

            <div className="lg:col-span-6 reveal-item space-y-6">
               <div className="space-y-4">
                  {apiPlans.map((plan) => (
                     <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative cursor-pointer p-6 md:p-8 border rounded-2xl transition-all duration-300 overflow-hidden group
                       ${selectedPlanId === plan.id ? 'border-[#55B8F5] bg-[#F0F7FF] ring-2 ring-[#55B8F5]/30 shadow-md' : 'border-slate-200 bg-white hover:border-[#55B8F5]/50'}`}
                     >
                        <div className="flex justify-between items-center gap-4">
                           <div className="space-y-1.5 flex-1 min-w-0">
                              <h3 className="font-newsreader italic text-2xl md:text-3xl text-slate-900 leading-snug font-normal tracking-tight truncate">
                                 {plan.title}
                              </h3>
                              <p className="font-montserrat text-xs text-slate-600 leading-relaxed">
                                 {plan.subtitle}
                              </p>
                           </div>

                           <div className="flex items-center gap-6 shrink-0">
                              <div className="flex flex-col items-end">
                                 <span className="font-montserrat font-bold text-2xl md:text-3xl text-[#142B5C]">₹{Number(plan.price).toLocaleString('en-IN')}</span>
                                 {plan.originalPrice && (
                                    <span className="font-montserrat text-xs text-[#94A3B8] line-through">₹{Number(plan.originalPrice).toLocaleString('en-IN')}</span>
                                 )}
                              </div>

                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                              ${selectedPlanId === plan.id ? 'border-[#142B5C] bg-[#142B5C] text-white' : 'border-slate-300 group-hover:border-[#55B8F5]'}`}>
                                 {selectedPlanId === plan.id && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                       <path d="M20 6L9 17L4 12" />
                                    </svg>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className={`transition-all duration-500
              ${selectedPlanId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                  <button
                     onClick={handleContinue}
                     className="w-full relative group bg-[#142B5C] hover:bg-[#1a3568] px-8 py-5 flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all duration-300 rounded-xl shadow-lg cursor-pointer"
                  >
                     <span className="relative z-10 font-montserrat text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">Proceed to Checkout</span>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                     </svg>
                  </button>
               </div>
            </div>

         </div>

      </section>
   )
}

export default CertificatePricingSection
