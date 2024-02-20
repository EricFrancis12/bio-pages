'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import type { TBioPage, TTimerange } from '../../types';
import LineChart from './LineChart';
import BioPagesTable from './BioPagesTable';
import CalendarButton from '../CalendarButton';
import { defaultTimerange } from '../../default-data';

export default function BioPagesOverview({ bioPages, demoMode }: {
    bioPages: TBioPage[],
    demoMode?: boolean
}) {
    const [selectedBioPage_ids, setSelectedBioPage_ids] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [timerange, setTimerange] = useState<TTimerange>(defaultTimerange());

    const filteredBioPages = bioPages.filter(bioPage => (bioPage.name?.includes(searchQuery) || bioPage._id.includes(searchQuery)));
    const selectedBioPages = bioPages.filter(bioPage => selectedBioPage_ids.includes(bioPage._id));

    useEffect(() => setSelectedBioPage_ids([]), [searchQuery, bioPages.length]);

    return (
        <div className='flex flex-col justify-start items-center gap-3 w-full p-2'>
            <div>
                <h1>
                    Bio Pages List
                </h1>
            </div>
            <div className='flex flex-col justify-start items-center gap-2 w-full'>
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <CalendarButton timerange={timerange} setTimerange={setTimerange} />
                    </div>
                    <div>
                        <span>
                            {'Now Showing: '}
                        </span>
                        {selectedBioPages.length === 0
                            ? <span className='italic'>
                                All Pages
                            </span>
                            : selectedBioPages.map((bioPage, index) => (
                                <React.Fragment key={bioPage._id}>
                                    <span>
                                        {bioPage._id}
                                    </span>
                                    {(index === selectedBioPages.length - 1) ? '' : ', '}
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                <div className='w-full'>
                    <LineChart
                        bioPages={selectedBioPages.length === 0 ? bioPages : selectedBioPages}
                        timerange={timerange}
                    />
                </div>
            </div>
            {!demoMode &&
                <div className='mt-4 flex justify-end items-center gap-2 w-full md:mt-8'>
                    <Link
                        href='/dashboard/bio-pages/create'
                        className='flex gap-2 items-center h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    >
                        <span className='hidden md:block'>
                            Create New Page
                        </span>
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
            }
            <div className='w-full'>
                <BioPagesTable
                    bioPages={filteredBioPages}
                    timerange={timerange}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedBioPage_ids={selectedBioPage_ids}
                    setSelectedBioPage_ids={setSelectedBioPage_ids}
                    demoMode={demoMode}
                />
            </div>
        </div>
    )
}
