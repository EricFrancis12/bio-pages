import BioPage from "@/app/lib/components/BioPage";
import { fetchBioPageBy_id, updateExistingBioPage } from "@/app/lib/data";
import { Click } from "@/app/lib/types";

export default async function page({ params }: { params: { bioPage_id: string } }) {
    const bioPage = await fetchBioPageBy_id(params.bioPage_id);
    if (bioPage?.clicks) {
        const click: Click = {
            t: Date.now()
        };
        bioPage.clicks.push(click);
        updateExistingBioPage(bioPage); // we are not awaiting this, because it makes no sense to make the client wait for us to save a click to db
    }

    return bioPage
        ? (
            <BioPage bioPage={bioPage} />
        )
        : <div>
            Bio Page not found :/
        </div>
}