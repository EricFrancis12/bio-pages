import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Bio Pages App',
};

export default function page() {
    return (
        <div>
            <div>
                <h1>
                    Bio Pages App
                </h1>
            </div>
            <div>
                <Link href="/login">
                    <span>
                        Log in
                    </span>
                    <ArrowRightIcon />
                </Link>
            </div>
        </div>
    )
}
