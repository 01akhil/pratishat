
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Discover from "@/components/Discover";
import SurverysAndReports from "@/components/SurveysAndReports";
import Testimonials from "@/components/Testimonials";
import AskOurIntelligence from "@/components/AskOurIntelligence";
export default async function Home() {
  return (
    <div className='bg-gradient-to-br from-[#777EFF]/40 via-white to-[#CF31F6]/40 overflow-x-hidden'>
      <Hero />
      <Features/>
      <Discover/>
      <SurverysAndReports/>
      <Testimonials/>
      <AskOurIntelligence/>
      

    </div>
  );
}