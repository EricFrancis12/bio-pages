import { Metadata } from 'next';
import ComingSoon from '../lib/components/ComingSoon';

export const metadata: Metadata = {
    title: 'Resources',
};

export default function Page() {
    return (
        <ComingSoon />
    )
}
