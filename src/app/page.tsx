import './main.styles.css';
import { Metadata } from 'next';
import Home from './lib/components/Home/Home';

export const metadata: Metadata = {
    title: 'Rybio.link | Link In Bio Page-Builder',
    description: 'Rybio.link | Link In Bio Page-Builder',
};

export default async function Page() {
    return (
        <Home />
    )
}
