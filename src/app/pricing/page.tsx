import { Metadata } from 'next';
import ComingSoon from '../lib/components/ComingSoon';

export const metadata: Metadata = {
    title: 'Pricing',
};

export default function Page() {
    return (
        <ComingSoon />
    )
}
