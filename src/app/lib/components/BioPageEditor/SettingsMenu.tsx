'use client';

import { useRouter } from 'next/navigation';
import { useState, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import { BioPage } from '../../types';
import { defaultBioPage } from '../../default-data';

export default function SettingsMenu({ bioPage, setBioPage, onClose, demoMode }: {
    bioPage: BioPage,
    setBioPage: Function,
    onClose: MouseEventHandler,
    demoMode?: boolean
}) {
    const { push } = useRouter();

    const [loading, setLoading] = useState(false);
    const [shortLink, setShortLink] = useState<string>(bioPage._id);
    const [unavailable_ids, setUnavailable_ids] = useState<string[]>([]);

    const shortLinkButtonDisabled = loading || !shortLink || unavailable_ids.includes(shortLink) || shortLink === bioPage._id;

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        bioPageKey: string
    ) {
        setBioPage({
            ...defaultBioPage,
            ...bioPage,
            [bioPageKey]: e.target.value
        });
    }

    async function handleButtonClick() {
        if (demoMode === true) return;

        setLoading(true);
        const newBioPage_id = shortLink;
        const resJson = await fetch(`/api/bio-pages/${bioPage._id}/change_id`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                _id: newBioPage_id
            })
        })
            .then((res) => res.json())
            .catch((err) => console.error(err));

        if (resJson.success === true) {
            push(`/dashboard/bio-pages/${newBioPage_id}/edit`);
        } else {
            const newUnavailable_ids = [...unavailable_ids, shortLink];
            setUnavailable_ids(newUnavailable_ids);
        }
        setLoading(false);
    }

    return (
        <BlackTransparentOverlay className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-6 sm:min-w-[50%] mx-2 sm:mx-4 px-3 pt-2 pb-4 bg-slate-400 rounded'>
                <div className='flex justify-between items-center w-full mb-1 px-1'>
                    <span className='text-lg'>
                        Settings
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faX} />
                    </span>
                </div>
                <InputRow
                    content={'Edit Short Link'}
                    value={shortLink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShortLink(e.target.value)}
                    disabled={demoMode === true}
                >
                    <div className='flex flex-col-reverse sm:flex-row justify-between items-start w-full gap-4 pt-3 pb-1'>
                        <div
                            className='max-w-[250px] text-gray-300 italic font-normal'
                            style={{
                                overflowWrap: 'break-word'
                            }}
                        >
                            {process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}` : ''}{'/p/'}{shortLink}
                        </div>
                        {loading
                            ? <div className=''>
                                Loading...
                            </div>
                            : <button
                                className={(unavailable_ids.includes(shortLink) ? 'text-red-400 bg-red-100 ' : 'text-green-400 bg-green-100 ')
                                    + (shortLinkButtonDisabled && !unavailable_ids.includes(shortLink) ? ' opacity-50 ' : ' ')
                                    + (shortLinkButtonDisabled ? ' cursor-not-allowed ' : ' cursor-pointer ')
                                    + ' px-2 rounded'}
                                disabled={shortLinkButtonDisabled}
                                onClick={e => handleButtonClick()}
                            >
                                {unavailable_ids.includes(shortLink)
                                    ? 'Unavailable'
                                    : 'Submit'
                                }
                            </button>
                        }
                    </div>
                </InputRow>
            </div>
        </BlackTransparentOverlay>
    )
}

const InputRow = ({ content, value, onChange, disabled, children }: {
    content: string | React.ReactNode,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean,
    children?: React.ReactNode
}) => (
    <div className='w-full px-1'>
        <div className='flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 w-full'>
            <span
                className='font-bold'
                style={{
                    whiteSpace: 'nowrap'
                }}
            >
                {content}
            </span>
            <input
                className='w-full px-2 py-1 rounded'
                disabled={disabled}
                value={value}
                onChange={onChange}
            />
        </div>
        {children}
    </div>
);
