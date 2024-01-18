'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faChartSimple, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { defaultImagesrc } from '../../default-data';
import type { BioPage, Timerange } from '../../types';
import SearchBar from './SearchBar';
import YesNoPopup from '../YesNoPopup';
import { traverseParentsForClass } from '../../utils/utils';
import { filterClicksWithinTimerange } from '../../utils/timerange-utils';
import Pagination, { filterByCurrentPage, calcTotalNumPages } from '../Pagination';

export const IGNORE_ROW_CLICK_CLASS = 'IGNORE_ROW_CLICK_CLASS';

export default function BioPagesTable(props: {
    bioPages: BioPage[],
    handleBioPageDelete: Function,
    timerange: Timerange,
    searchQuery: string,
    setSearchQuery: Function,
    selectedBioPage_ids: string[],
    setSelectedBioPage_ids: Function
}) {
    const { bioPages = [], handleBioPageDelete, timerange, searchQuery, setSearchQuery, selectedBioPage_ids, setSelectedBioPage_ids } = props;

    const [deletePopupBioPage_id, setDeletePopupBioPage_id] = useState<string | null>(null);
    const [handlingDelete, setHandlingDelete] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalNumPages = calcTotalNumPages(bioPages, 3);

    function handleRowClick(e: React.MouseEvent<HTMLElement>, bioPage_id: string) {
        if (traverseParentsForClass(e.target as HTMLElement, IGNORE_ROW_CLICK_CLASS)) {
            return;
        }

        if (!selectedBioPage_ids.includes(bioPage_id)) {
            setSelectedBioPage_ids([
                ...selectedBioPage_ids,
                bioPage_id
            ]);
        } else {
            const newSelectedBioPage_ids = selectedBioPage_ids.filter(_bioPage_id => _bioPage_id !== bioPage_id);
            setSelectedBioPage_ids(newSelectedBioPage_ids);
        }
    }

    function handleDeleteButtonClick(e: React.MouseEvent<HTMLDivElement>, bioPage_id: string) {
        e.stopPropagation();
        setDeletePopupBioPage_id(bioPage_id);
    }

    return (
        <>
            {deletePopupBioPage_id &&
                <YesNoPopup
                    text={`Are you sure you want to delete ${deletePopupBioPage_id}?`}
                    disabled={handlingDelete}
                    onClickYes={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setHandlingDelete(true);
                        handleBioPageDelete(deletePopupBioPage_id)
                            .catch((err: Error) => console.error(err))
                            .finally(() => {
                                setDeletePopupBioPage_id(null);
                                setHandlingDelete(false);
                            });
                    }}
                    onClickNo={(e: React.MouseEvent<HTMLButtonElement>) => setDeletePopupBioPage_id(null)}
                />
            }
            <div>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <div className='mt-6 flow-root'>
                    <div className='inline-block min-w-full align-middle'>
                        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
                            <div className='md:hidden'>
                                {bioPages.map((bioPage) => (
                                    <div
                                        key={bioPage._id}
                                        className={(selectedBioPage_ids.includes(bioPage._id) ? 'bg-blue-200' : 'bg-white')
                                            + ' mb-2 w-full rounded-md p-4 cursor-pointer'}
                                        onClick={e => handleRowClick(e, bioPage._id)}
                                    >
                                        <div className='flex items-center justify-between border-b pb-4'>
                                            <div>
                                                <div className='mb-2 flex items-center'>
                                                    <Image
                                                        src={bioPage.imagesrc || defaultImagesrc}
                                                        className='mr-2 rounded-full'
                                                        width={28}
                                                        height={28}
                                                        alt={`${bioPage.name} profile picture`}
                                                    />
                                                    <p>{bioPage.name}</p>
                                                </div>
                                                <p className='text-sm text-gray-500'>{bioPage.name ?? 'name'}</p>
                                            </div>
                                            <div className='flex flex-row-reverse md:flex-row items-center gap-3'>
                                                <Link
                                                    className={IGNORE_ROW_CLICK_CLASS + ' text-gray-300 hover:text-blue-400'}
                                                    href={`/p/${bioPage._id}`}
                                                    target='_blank'
                                                >
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </Link>
                                                <p>{`${process.env.domain ?? ''}/p/${bioPage._id}`}</p>
                                            </div>
                                        </div>
                                        <div className='flex w-full items-center justify-between pt-4'>
                                            <div>
                                                <div className='flex items-center gap-3 text-xl font-medium'>
                                                    <FontAwesomeIcon icon={faChartSimple} />
                                                    <p>{filterClicksWithinTimerange(bioPage.clicks, timerange).length}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-end gap-2'>
                                                <Link
                                                    href={IGNORE_ROW_CLICK_CLASS + ` /dashboard/bio-pages/${bioPage._id}/edit`}
                                                    className='flex justify-center items-center rounded-md border p-2 hover:bg-gray-100'
                                                >
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </Link>
                                                <div
                                                    className={IGNORE_ROW_CLICK_CLASS
                                                        + ' flex justify-center items-center rounded-md border p-2 hover:bg-gray-100 cursor-pointer'}
                                                    onClick={e => handleDeleteButtonClick(e, bioPage._id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <table className='hidden min-w-full text-gray-900 md:table'>
                                <thead className='rounded-lg text-left text-sm font-normal'>
                                    <tr>
                                        <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                                            {''}
                                        </th>
                                        <th scope='col' className='px-3 py-5 font-medium'>
                                            Name
                                        </th>
                                        <th scope='col' className='px-3 py-5 font-medium'>
                                            Url
                                        </th>
                                        <th scope='col' className='px-3 py-5 font-medium'>
                                            Links
                                        </th>
                                        <th scope='col' className='px-3 py-5 font-medium'>
                                            Clicks
                                        </th>
                                        <th scope='col' className='relative py-3 pl-6 pr-3'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white'>
                                    {filterByCurrentPage(bioPages, currentPage, 3)
                                        .map((bioPage: BioPage) => (
                                            <tr
                                                key={bioPage._id}
                                                className={(selectedBioPage_ids.includes(bioPage._id) ? 'bg-blue-200' : 'bg-white')
                                                    + ' w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg cursor-pointer'}
                                                onClick={e => handleRowClick(e, bioPage._id)}
                                            >
                                                <td>
                                                    <Image
                                                        src={bioPage.imagesrc || defaultImagesrc}
                                                        className='rounded-full mx-2'
                                                        width={28}
                                                        height={28}
                                                        alt='Pages Table'
                                                    />
                                                </td>
                                                <td className='overflow-hidden truncate max-w-[100px]'>
                                                    {bioPage.name}
                                                </td>
                                                <td className='whitespace-nowrap px-3 py-3 overflow-hidden'>
                                                    <div className='flex items-center gap-3 overflow-hidden'>
                                                        <Link
                                                            className={IGNORE_ROW_CLICK_CLASS + ' text-gray-300 hover:text-blue-400'}
                                                            href={`/p/${bioPage._id}`}
                                                            target='_blank'
                                                        >
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </Link>
                                                        <p>
                                                            {`${process.env.domain ?? ''}/p/${bioPage._id}`}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className='whitespace-nowrap px-3 py-3'>
                                                    {bioPage.buttons.length}
                                                </td>
                                                <td className='whitespace-nowrap px-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <FontAwesomeIcon icon={faChartSimple} />
                                                        <p>{filterClicksWithinTimerange(bioPage.clicks, timerange).length}</p>
                                                    </div>
                                                </td>
                                                <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                                                    <div className='flex justify-end gap-3'>
                                                        <Link
                                                            className={IGNORE_ROW_CLICK_CLASS +
                                                                ' flex justify-center items-center rounded-md border p-2 hover:bg-gray-100'}
                                                            href={`/dashboard/bio-pages/${bioPage._id}/edit`}
                                                        >
                                                            <FontAwesomeIcon icon={faPencil} />
                                                        </Link>
                                                        <div
                                                            className={IGNORE_ROW_CLICK_CLASS +
                                                                ' flex justify-center items-center rounded-md border p-2 hover:bg-gray-100 cursor-pointer'}
                                                            onClick={e => handleDeleteButtonClick(e, bioPage._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className='flex justify-center items-center w-full'>
                                <Pagination
                                    className='w-[50%]'
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalNumPages={totalNumPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
