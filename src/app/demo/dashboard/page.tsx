import Dashboard from '@/app/lib/components/Dashboard/Dashboard';
import { demoBioPage_1, demoBioPage_2, demoBioPage_3 } from '@/app/lib/demo-pages';

export default function page() {
    const bioPages = [
        demoBioPage_1,
        demoBioPage_2,
        demoBioPage_3
    ];

    return (
        <Dashboard bioPages={bioPages} />
    )
}
