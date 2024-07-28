import Dashboard from '@/app/lib/components/Dashboard/Dashboard';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

const bioPages = [
    demoBioPage_1,
    demoBioPage_2,
    demoBioPage_3
];

export default function Page() {
    return (
        <Dashboard bioPages={bioPages} demoMode={true} />
    )
}
