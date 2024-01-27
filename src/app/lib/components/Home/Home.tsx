import HomeNav from '../HomeNav/HomeNav';
import HeroSection from './sections/HeroSection';
import SetupSection from './sections/SetupSection';
import AnalyzeYourAudienceSection from './sections/AnalyzeYourAudienceSection';
import ExpandYourReachSection from './sections/ExpandYourReachSection';
import WhatMakesUsDifferentSection from './sections/WhatMakesUsDifferentSection';
import FAQSection from './sections/FAQSection';
import FloatingSideNav from './FloatingSideNav';
import Footer from '../Footer/Footer';

export default function Home() {
    return (
        <div className='w-full text-white bg-black'>
            <HomeNav />
            <HeroSection />
            <SetupSection />
            <AnalyzeYourAudienceSection />
            <ExpandYourReachSection />
            <WhatMakesUsDifferentSection />
            <FAQSection />
            <FloatingSideNav />
            <Footer />
        </div>
    )
}
