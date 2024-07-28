import BioPage from '@/app/lib/components/BioPage';
import { demoBioPages } from '@/app/lib/demo-pages';

export default function Page({ params }: {
    params: { demoBioPage_id: string },
}) {
    const bioPage = demoBioPages.find(({ _id }) => _id === params.demoBioPage_id);

    return bioPage
        ? <BioPage bioPage={bioPage} />
        : <div>
            Demo Bio Page not found :/
        </div>
}