'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic'
import React, { useState, useRef, useEffect } from 'react';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import { defaultImagesrc } from '../../default-data';
import { base64ToBlobUrl } from '../../utils/utils';

const Avatar = dynamic(() => import('react-avatar-edit'), {
    // Importing this way because needs to exclusively run on the client.
    ssr: false,
    loading: () => <p>Loading<br />Avatar...</p>
});

export default function ImageEditor({ imagesrc, blobUrl, setBlobUrl }: {
    imagesrc?: string,
    blobUrl: string,
    setBlobUrl: Function
}) {
    const imageElementRef = useRef<HTMLImageElement | null>(null);

    const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
    const [avatarRendered, setAvatarRendered] = useState<boolean>(true);
    const [imageHeight, setImageHeight] = useState<number>(120);

    useEffect(() => {
        if (!avatarRendered) {
            // Solution for re-rendering Avatar, otherwise the inherent close button persists.
            setAvatarRendered(true);
        }
    }, [avatarRendered]);

    function onClose() {
        setImageHeight(120);
        setPreviewBlobUrl(null);
    }

    function onCrop(view: string) {
        setPreviewBlobUrl(base64ToBlobUrl(view));
    }

    function handleSubmitButtonClick() {
        setImageHeight(120);
        setBlobUrl(previewBlobUrl);
        setPreviewBlobUrl(null);
        setAvatarRendered(false);
    }

    return (
        <>
            {imageHeight === 350 &&
                // This backup Image takes the place of the Avatar Image as the user is cropping,
                // and BlackTransparentOverlay is active
                <ImageContainer>
                    <Image
                        src={blobUrl || imagesrc || defaultImagesrc}
                        alt='Page Image'
                        height={120}
                        width={120}
                    />
                </ImageContainer>
            }
            <BlackTransparentOverlay
                disabled={imageHeight !== 350 && !previewBlobUrl}
                className='flex justify-center items-center'
            >
                <ImageContainer className={(previewBlobUrl ? 'bg-white rounded mx-8 sm:mx-16' : 'relative')}>
                    <Image
                        id='__IMAGE__'
                        ref={imageElementRef}
                        src={previewBlobUrl || blobUrl || imagesrc || defaultImagesrc}
                        alt='Page Image'
                        height={imageHeight}
                        width={imageHeight}
                        className={imageHeight === 350 && !previewBlobUrl ? 'opacity-0' : ''}
                    />
                    {imageHeight === 350 && !previewBlobUrl &&
                        <div
                            className='p-2 bg-red-400 hover:bg-red-300 rounded cursor-pointer'
                            onClick={e => onClose()}
                        >
                            Cancel Upload
                        </div>
                    }
                    <span
                        className={(previewBlobUrl ? 'opacity-100' : imageHeight === 350 ? 'opacity-0' : 'opacity-0 hover:opacity-40 absolute')
                            + ' bg-white overflow-hidden cursor-pointer'}
                        style={{
                            transition: imageHeight === 350 ? undefined : 'opacity 0.3s ease-in-out'
                        }}
                        onClick={e => {
                            setImageHeight(350);
                        }}
                    >
                        {avatarRendered &&
                            <Avatar
                                height={imageHeight}
                                width={imageHeight}
                                onClose={onClose}
                                onCrop={onCrop}
                            />
                        }
                    </span>
                    {previewBlobUrl &&
                        <div
                            className='p-2 bg-green-400 hover:bg-green-300 rounded cursor-pointer'
                            style={{
                                transition: 'ease-in-out 0.3s background-color'
                            }}
                            onClick={e => handleSubmitButtonClick()}
                        >
                            Add Image
                        </div>
                    }
                </ImageContainer>
            </BlackTransparentOverlay >
        </>
    )
}

const ImageContainer = ({ className, children }: {
    className?: string,
    children?: React.ReactNode
}) => (
    <div className={(className) + ' flex flex-col justify-center items-center gap-2 w-full my-8 p-4'}>
        {children}
    </div>
);
