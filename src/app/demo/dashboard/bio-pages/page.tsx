import BioPagesOverview from '@/app/lib/components/BioPagesOverview/BioPagesOverview';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

export default function Page() {
    const bioPages = [
        demoBioPage_1,
        demoBioPage_2,
        demoBioPage_3
    ];

    return (
        <BioPagesOverview bioPages={bioPages} demoMode={true} />
    )
}
