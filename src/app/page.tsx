import './main.styles.css';
import { Metadata } from 'next';
import Home from './lib/components/Home/Home';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default async function Page() {

    return (
        <Home />
    )
}
