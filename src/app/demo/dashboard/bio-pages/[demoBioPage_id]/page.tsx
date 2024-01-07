import BioPage from '@/app/lib/components/BioPage';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

export default async function page({ params }: { params: { demoBioPage_id: string } }) {
    let bioPage;
    switch (params.demoBioPage_id) {
        case 'demo-1': bioPage = demoBioPage_1; break;
        case 'demo-2': bioPage = demoBioPage_2; break;
        case 'demo-3': bioPage = demoBioPage_3; break;
    }

    return bioPage
        ? (
            <BioPage bioPage={bioPage} />
        )
        : (
            <div>
                Demo Bio Page not found :/
            </div>
        )
}