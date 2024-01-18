import BioPage from '@/app/lib/components/BioPage';
import { fetchBioPageBy_id, createAndSaveNewClick } from '@/app/lib/data';
import { Click } from '@/app/lib/types';

export default async function page({ params }: { params: { bioPage_id: string } }) {
    const bioPage = await fetchBioPageBy_id(params.bioPage_id);
    if (bioPage) {
        const click: Click = {
            biopage_id: bioPage._id,
            timestamp: Date.now()
        };
        createAndSaveNewClick(click); // we are not awaiting this, because it makes no sense to make the client wait for us to save a click to db
    }

    return bioPage
        ? (
            <BioPage bioPage={bioPage} />
        )
        : (
            <div>
                Bio Page not found :/
            </div>
        )
}