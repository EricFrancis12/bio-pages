import React from 'react';
import { Metadata } from 'next';
import { fetchBioPages } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Bio Pages List'
};

export default async function page() {
    const bioPages = await fetchBioPages();

    return (
        <div>
            <div>
                <h1>
                    Bio Pages List
                </h1>
            </div>
            <div>
                {bioPages.map((bioPage, index) => (
                    <div key={index}>

                    </div>
                ))}
            </div>
        </div>
    )
}
