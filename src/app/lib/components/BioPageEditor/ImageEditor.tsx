import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Avatar from 'react-avatar-edit';
import { defaultImagesrc } from '../../default-data';
import { base64ToBlobUrl } from '../../utils';

export default function ImageEditor(props: {
    imagesrc?: string,
    blobUrl: string,
    setBlobUrl: Function
}) {
    const { imagesrc, blobUrl, setBlobUrl } = props;

    const imageElementRef = useRef<HTMLImageElement | null>(null);

    const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
    const [avatarRendered, setAvatarRendered] = useState<boolean>(true);

    useEffect(() => setAvatarRendered(true), [avatarRendered]); // Solution for re-rendering Avatar, otherwise the inherent close button persists.

    function onClose() {
        setPreviewBlobUrl(null);
    }

    function onCrop(view: string) {
        setPreviewBlobUrl(base64ToBlobUrl(view));
    }

    function handleSubmitButtonClick() {
        setBlobUrl(previewBlobUrl);
        setPreviewBlobUrl(null);
        setAvatarRendered(false);
    }

    return (
        <div className='relative flex flex-col justify-center items-center gap-2 w-full'>
            <Image
                ref={imageElementRef}
                src={previewBlobUrl || blobUrl || imagesrc || defaultImagesrc}
                alt='Page Image'
                height={200}
                width={200}
            />
            <span
                className={(previewBlobUrl ? 'opacity-100' : 'opacity-0 hover:opacity-40 absolute')
                    + ' bg-white overflow-hidden cursor-pointer'}
                style={{
                    transition: 'opacity 0.3s ease-in-out'
                }}
            >
                {avatarRendered &&
                    <Avatar
                        height={previewBlobUrl ? 400 : (imageElementRef.current?.offsetHeight ?? 0)}
                        width={previewBlobUrl ? 400 : (imageElementRef.current?.offsetWidth ?? 0)}
                        onClose={onClose}
                        onCrop={onCrop}
                    />
                }
            </span>
            {previewBlobUrl &&
                <button
                    onClick={e => handleSubmitButtonClick()}
                >
                    Submit
                </button>
            }
        </div>
    )
}
