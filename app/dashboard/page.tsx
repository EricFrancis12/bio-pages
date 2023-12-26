import React from 'react';
import { Metadata } from 'next';
import { fetchBioPages } from '../lib/data';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default async function page() {
    const bioPages = await fetchBioPages();

    return (
        <div>
            <div>
                <h1>
                    Dashboard
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
