import type { TBioPage, TClick } from '../../types';
import { faUser, faUserGroup, faUsers, faFile } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { formatDayOfWeekAndDate, getPreviousDates } from '../../utils/utils';

export default function Dashboard({ bioPages }: {
    bioPages: TBioPage[],
    demoMode?: boolean,
}) {
    const numVisitorsToday = getBioPagesClicks(bioPages, 'today').length;
    const numVisitorsYesterday = getBioPagesClicks(bioPages, 'yesterday').length;
    const numVisitorsPast7Days = getBioPagesClicks(bioPages, 7).length;
    const topBioPage = getTopBioPage(bioPages);

    const top5BioPages = bioPages.sort((a, b) => b.clicks.length - a.clicks.length).slice(0, 5);

    return (
        <div>
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                <Card title='Visitors Today' icon={faUser} value={numVisitorsToday} />
                <Card title='Visitors Yesterday' icon={faUserGroup} value={numVisitorsYesterday} />
                <Card title='Visitors Past 7 Days' icon={faUsers} value={numVisitorsPast7Days} />
                <Card
                    title='Top Page'
                    icon={faFile}
                    value={topBioPage ? <a href={`/p/${topBioPage._id}`} target='_blank'>{topBioPage.name}</a> : '-'}
                />
            </div>
            <div className='flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start gap-4 h-[-webkit-fill-available] w-full mt-8'>
                <div className='relative flex flex-col justify-between items-center gap-4 w-full lg:w-[70%]'>
                    <div className='w-full px-4 pb-6 rounded-xl bg-gray-100 border border-black shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Activity Past 7 Days
                            </span>
                        </div>
                        <LineChart bioPages={bioPages} />
                    </div>
                    <div className='w-full px-4 pb-4 rounded-xl bg-gray-100 border border-black shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Clicks Per Time of Day
                            </span>
                        </div>
                        <BarChart bioPages={bioPages} />
                    </div>
                </div>
                <div className='flex flex-row lg:flex-col justify-center lg:justify-start items-start lg:items-center gap-4 w-[50%] lg:w-[30%]'>
                    <div className='relative flex flex-col justify-between items-center w-full px-4 pb-6 rounded-xl bg-gray-100 border border-black shadow-sm'>
                        <div className='w-full p-4'>
                            <span>
                                Top Pages
                            </span>
                        </div>
                        <PieChart bioPages={top5BioPages} />
                    </div>
                </div>
            </div>
        </div >
    )
}

function mapBioPages(bioPages: TBioPage[]) {
    const result: { [key: string]: TClick[] } = {};
    const allClicks = bioPages.map(bioPage => bioPage.clicks).flat();
    allClicks.forEach(click => {
        const formattedDate = formatDayOfWeekAndDate(new Date(click.timestamp));
        if (result[formattedDate]) {
            result[formattedDate].push(click);
        } else {
            result[formattedDate] = [click];
        }
    });
    return result;
};

function getBioPagesClicks(bioPages: TBioPage[], range: string | number): TClick[] {
    const mappedBioPages = mapBioPages(bioPages);

    if (typeof range === 'number') {
        const previousDates = getPreviousDates(range);
        return previousDates.map(formattedDate => mappedBioPages[formattedDate] ?? [])?.flat() ?? [];
    } else if (range.toLowerCase() === 'today') {
        const today = getPreviousDates(0)[0];
        return mappedBioPages[today] ?? [];
    } else if (range.toLowerCase() === 'yesterday') {
        const yesterday = getPreviousDates(1)[0];
        return mappedBioPages[yesterday] ?? [];
    }
    return [];
}

function getTopBioPage(bioPages: TBioPage[]): TBioPage | null {
    return bioPages.length === 0
        ? null
        : bioPages.reduce((accBioPage: TBioPage, currBioPage) => {
            const maxClicksLength = accBioPage ? accBioPage.clicks.length : 0;
            const currentClicksLength = currBioPage.clicks.length;
            return currentClicksLength > maxClicksLength ? currBioPage : accBioPage;
        }, bioPages[0]);
}
