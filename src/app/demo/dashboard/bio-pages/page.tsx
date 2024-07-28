import BioPagesOverview from '@/app/lib/components/BioPagesOverview/BioPagesOverview';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

const bioPages = [
    demoBioPage_1,
    demoBioPage_2,
    demoBioPage_3
];

export default function Page() {
    return (
        <BioPagesOverview bioPages={bioPages} demoMode={true} />
    )
}
