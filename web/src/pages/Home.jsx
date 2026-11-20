import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCourses } from '../redux/slices/courseSlice'
import Hero from '../components/Hero'
import LandingMarquee from '../components/LandingMarquee'
import LandingAboutSection from '../components/LandingAboutSection'
import WhyPearlsSection from '../components/WhyPearlsSection'
import LandingScrollStackSection from '../components/LandingScrollStackSection'
import LandingFreeResourcesCarousel from '../components/LandingFreeResourcesCarousel'
import LandingCoursesSection from '../components/LandingCoursesSection'
import MentorSection from '../components/MentorSection'
import TestimonialsScroll from '../components/TestimonialsScroll'
import HomeFAQSection from '../components/HomeFAQSection'
import LandingDownloadAppSection from '../components/LandingDownloadAppSection'
import LandingContactCTA from '../components/LandingContactCTA'

const Home = ({ isLoaded }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  return (
    <div className="w-full">
      <Hero isLoaded={isLoaded} />
      <LandingMarquee />
      <LandingAboutSection />
      <LandingScrollStackSection />
      <LandingFreeResourcesCarousel />
      <LandingCoursesSection />
      <MentorSection />
      <WhyPearlsSection />
      <TestimonialsScroll variant="landing" />
      <HomeFAQSection />
      <LandingDownloadAppSection />
      <LandingContactCTA />
    </div>
  )
}

export default Home