import BioPageEditor from '@/app/lib/components/BioPageEditor/BioPageEditor';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

export default function Page({ params }: { params: { demoBioPage_id: string } }) {
    let bioPage;
    switch (params.demoBioPage_id) {
        case demoBioPage_1._id: bioPage = demoBioPage_1; break;
        case demoBioPage_2._id: bioPage = demoBioPage_2; break;
        case demoBioPage_3._id: bioPage = demoBioPage_3; break;
    }

    return bioPage
        ? (
            <BioPageEditor bioPage={bioPage} demoMode={true} />
        )
        : (
            <div>
                Demo Bio Page not found :/
            </div>
        )
}