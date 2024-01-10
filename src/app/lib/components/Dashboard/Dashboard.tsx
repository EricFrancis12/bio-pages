import type { BioPage } from '../../types';
import { faUser, faUserGroup, faUsers, faFile } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { getBioPagesClicks } from '../../utils/utils';

export default function Dashboard(props: {
    bioPages: BioPage[]
}) {
    const { bioPages } = props;

    const numVisitorsToday = getBioPagesClicks(bioPages, 'today').length;
    const numVisitorsYesterday = getBioPagesClicks(bioPages, 'yesterday').length;
    const numVisitorsPast7Days = getBioPagesClicks(bioPages, 7).length;
    const topBioPage_id = bioPages.reduce((accBioPage: BioPage, currBioPage) => {
        const maxClicksLength = accBioPage ? accBioPage.clicks.length : 0;
        const currentClicksLength = currBioPage.clicks.length;
        return currentClicksLength > maxClicksLength ? currBioPage : accBioPage;
    }, bioPages[0])._id;

    const top5BioPages = bioPages.sort((a, b) => b.clicks.length - a.clicks.length).slice(0, 5);

    return (
        <div className='h-[-webkit-fill-available]'>
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                <Card title='Visitors Today' icon={faUser} value={numVisitorsToday} />
                <Card title='Visitors Yesterday' icon={faUserGroup} value={numVisitorsYesterday} />
                <Card title='Visitors Past 7 Days' icon={faUsers} value={numVisitorsPast7Days} />
                <Card title='Top Page' icon={faFile} value={`${process.env.domain ?? ''}/p/${topBioPage_id}`} />
            </div>
            <div className='flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start gap-4 h-[-webkit-fill-available] w-full mt-8'>
                <div className='relative flex flex-col justify-between items-center gap-4 w-full lg:w-[70%]'>
                    <div className='w-full px-4 pb-6 rounded-xl bg-gray-50 shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Activity Past 7 Days
                            </span>
                        </div>
                        <LineChart bioPages={bioPages} />
                    </div>
                    <div className='w-full px-4 pb-4 rounded-xl bg-gray-50 shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Clicks Per Time of Day
                            </span>
                        </div>
                        <BarChart bioPages={bioPages} />
                    </div>
                </div>
                <div className='flex flex-row lg:flex-col justify-center lg:justify-start items-start lg:items-center gap-4 w-[50%] lg:w-[30%]'>
                    <div className='relative flex flex-col justify-between items-center w-full px-4 pb-6 rounded-xl bg-gray-50 shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Top Pages
                            </span>
                        </div>
                        <PieChart bioPages={top5BioPages} />
                    </div>
                </div>
            </div>
        </div>
    )
}
