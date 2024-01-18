import LandingSection from './sections/LandingSection';
import TrustedByLogosSection from './sections/TrustedByLogosSection';
import SetupSection from './sections/SetupSection';
import FeatureToggleSection from './sections/FeatureToggleSection';
import CliCommandSection from './sections/CliCommandSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import StatsSection from './sections/StatsSection';
import RecipeTextSection from './sections/RecipeTextSection';
import RecipeContentSection from './sections/RecipeContentSection';
import VideoSection from './sections/VideoSection';
import BottomEndingSection from './sections/BottomEndingSection';

export default function Home() {
    return (
        <div id='home' className='w-full'>
            <div id='supertokens-webflow-header' style={{ minHeight: '84px' }}></div>
            <div className='dummy-header'>
                <div data-collapse='medium' data-animation='default' data-duration='400' id='header-webflow-clone' data-easing='ease' data-easing2='ease' role='banner' className='navbar w-nav'></div>
            </div>
            <LandingSection />
            {/* <TrustedByLogosSection /> */}
            <SetupSection />
            <div className='spacing-divide-section' />
            <FeatureToggleSection />
            <CliCommandSection />
            <TestimonialsSection />
            <CaseStudiesSection />
            <StatsSection />
            <RecipeTextSection />
            <RecipeContentSection />
            <VideoSection />
            <BottomEndingSection />
            <div id='home-sidenav-container' className='div-block-social-icons-nav'>
                <div className='w-layout-grid grid-19'>
                    <a id='home-sidenav-github' href='https://github.com/supertokens/supertokens-core' target='_blank' className='w-inline-block'><img src='https://supertokens.com/static/webflow/home/images/image-79.png' loading='lazy' data-w-id='5881cae8-5ced-9bd6-25b1-df2acc6865ff' alt='Github Icon' id='github_icon_sidebar' className='image-130' /></a>
                    <a id='home-sidenav-discord' href='/discord' target='_blank' className='w-inline-block'><img src='https://supertokens.com/static/webflow/home/images/logo-social-icon-discord.png' loading='lazy' data-w-id='5881cae8-5ced-9bd6-25b1-df2acc686601' alt='discord icon' id='discord_icon_sidebar' className='image-131' /></a>
                    <a id='home-sidenav-twitter' href='https://twitter.com/supertokensio' target='_blank' className='w-inline-block'><img src='https://supertokens.com/static/webflow/home/images/Twitter-Logo.png' loading='lazy' data-w-id='5881cae8-5ced-9bd6-25b1-df2acc686603' alt='Twitter Icon' id='twitter_icon_sidebar' className='image-130' /></a>
                </div>
            </div>
            <div id='hiring-banner-bottom-container' className='div-hiring-banner'>
                <div className='w-layout-grid grid-16'><img src='https://supertokens.com/static/webflow/home/images/heart_con_1heart_con.png' loading='lazy' width='40' height='38' alt='Heart Icon' id='w-node-f265ebaa-d1f3-bbab-1b76-45e774e2757e-64f57de5' className='image-132' />
                    <div id='w-node-f265ebaa-d1f3-bbab-1b76-45e774e2757f-64f57de5' className='text-block-31 tab mobile'>Join the team - We're hiring!</div>
                    <div className='text-block-31 tab'>Join the SuperTokens Team - We're hiring!</div>
                    <div className='text-block-31'>Come grow with us! We're looking for awesome people to join the SuperTokens team!</div>
                    <a id='hiring-cta-bottom' rel='nofollow' href='https://angel.co/company/supertokens/jobs' target='_blank' className='button-4 w-node-f265ebaa-d1f3-bbab-1b76-45e774e27581-64f57de5 w-button'>See open positions</a><img src='https://supertokens.com/static/webflow/home/images/dismiss_icon_1dismiss_icon.png' loading='lazy' width='12' height='12' alt='Dismiss' id='w-node-f265ebaa-d1f3-bbab-1b76-45e774e27583-64f57de5' data-w-id='f265ebaa-d1f3-bbab-1b76-45e774e27583' className='image-133' />
                </div>
            </div>
            <div id='supertokens-root' />
            <div id='supertokens-webflow-footer' />
        </div>
    )
}
