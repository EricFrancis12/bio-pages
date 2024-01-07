'use client';

import { useState, useRef, useEffect } from 'react';
import { BioPage as T_BioPage, Button, buttonStyle, Click, fontFamily, color } from '../../types';
import BioPage from '../BioPage';
import Card from './Card';
import ImageEditor from './ImageEditor';
import ColorInput from './ColorInput';
import ButtonSelect from './ButtonSelect';
import FontPicker from '../FontPicker';
import ButtonsEditor from './ButtonsEditor';
import ShortLinkEditor from './ShortLinkEditor';
import SaveButton from './SaveButton';
import { uploadImageFile, deleteImageFile } from '../../data';
import { objectsAreStructurallyIdentical } from '../../utils';

export default function BioPageEditor({ bioPage: _bioPage, handleUpdateBioPage }: {
    bioPage: T_BioPage | null,
    handleUpdateBioPage: Function
}) {
    const originalBioPage = useRef(_bioPage);

    const [bioPage, setBioPage] = useState<T_BioPage | null>(_bioPage);
    const [loading, setLoading] = useState<boolean>(false);
    const [blobUrl, setBlobUrl] = useState<string>('');

    const defaultBioPage = {
        _id: bioPage?._id as string,
        user_id: bioPage?.user_id as string,
        font: bioPage?.font as fontFamily,
        textcolor: bioPage?.textcolor as color,
        backgroundcolor: bioPage?.backgroundcolor as color,
        imagesrc: bioPage?.imagesrc as string,
        headingtext: bioPage?.headingtext as string,
        subheadingtext: bioPage?.subheadingtext as string,
        buttonstyle: bioPage?.buttonstyle as buttonStyle,
        buttoncolor: bioPage?.buttoncolor as color,
        buttontextcolor: bioPage?.buttontextcolor as color,
        buttonbordercolor: bioPage?.buttonbordercolor as color,
        buttons: bioPage?.buttons as Button[],
        clicks: bioPage?.clicks as Click[]
    };

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

    async function handleSaveButtonClick() {
        if (objectsAreStructurallyIdentical(bioPage, originalBioPage.current)
            && !blobUrl) {
            return;
        }

        setLoading(true);
        let uploadResult;
        if (blobUrl) {
            try {
                uploadResult = await uploadImageFile(blobUrl);
            } catch (err) {
                console.error(err);
            }
        }

        if (uploadResult && bioPage?.imagesrc) {
            try {
                deleteImageFile(bioPage?.imagesrc as string);
            } catch (err) {
                console.error(err);
            }
        }

        try {
            await handleUpdateBioPage(
                uploadResult?.url
                    ? {
                        ...bioPage,
                        imagesrc: uploadResult.url
                    }
                    : bioPage
            );
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className='h-full w-full p-4 bg-green-200'>
            <div>
                <h1>
                    Edit Bio Page
                </h1>
            </div>
            <div className='flex flex-col lg:flex-row justify-start items-start gap-2 h-full w-full'>
                <div className='w-full p-4'>
                    <Card title='Profile'>
                        <ImageEditor
                            imagesrc={bioPage?.imagesrc as string}
                            blobUrl={blobUrl}
                            setBlobUrl={setBlobUrl}
                        />
                        <div
                            className='flex flex-col justify-start items-start w-full p-2 bg-gray-300'
                            style={{ borderRadius: '8px' }}
                        >
                            <div>
                                <span className='text-sm'>
                                    Headline
                                </span>
                            </div>
                            <div className='w-full'>
                                <input
                                    className='w-full px-1 bg-transparent'
                                    value={bioPage?.headingtext}
                                    onChange={e => handleInputChange(e, 'headingtext')}
                                />
                            </div>
                        </div>
                        <div
                            className='flex flex-col justify-start items-start w-full p-2 bg-gray-300'
                            style={{ borderRadius: '8px' }}
                        >
                            <div>
                                <span className='text-sm'>
                                    Bio
                                </span>
                            </div>
                            <div className='w-full'>
                                <textarea
                                    className='w-full px-1 bg-transparent'
                                    value={bioPage?.subheadingtext}
                                    onChange={e => handleInputChange(e, 'subheadingtext')}
                                />
                            </div>
                        </div>
                        <div>
                            {loading
                                ? 'loading...'
                                : <SaveButton
                                    disabled={objectsAreStructurallyIdentical(bioPage, originalBioPage.current) && !blobUrl}
                                    onClick={() => handleSaveButtonClick()}
                                />
                            }
                        </div>
                    </Card>
                    <Card title='Edit Short Link'>
                        <ShortLinkEditor
                            value={bioPage?._id as string}
                            onValueChange={(newBioPage_id: string) => setBioPage({
                                ...bioPage,
                                _id: newBioPage_id
                            } as T_BioPage)}
                        />
                    </Card>
                    <Card title='Links'>
                        <ButtonsEditor
                            buttons={bioPage?.buttons as Button[]}
                            setButtons={(newButtons: Button[]) => setBioPage({
                                ...bioPage,
                                buttons: structuredClone(newButtons)
                            } as T_BioPage)} />
                    </Card>
                    <Card title='Style'>
                        <FontPicker
                            name='Font'
                            value={bioPage?.font as string}
                            onValueChange={(newFont: fontFamily) => setBioPage({
                                ...defaultBioPage,
                                ...bioPage,
                                font: newFont
                            })}
                        />
                        <ColorInput
                            name='Font Color'
                            value={bioPage?.textcolor as color}
                            onChange={e => handleInputChange(e, 'textcolor')}
                        />
                        <ColorInput
                            name='Background Color'
                            value={bioPage?.backgroundcolor as color}
                            onChange={e => handleInputChange(e, 'backgroundcolor')}
                        />
                    </Card>
                    <Card title='Buttons'>
                        <ButtonSelect
                            value={bioPage?.buttonstyle as buttonStyle}
                            onValueChange={(newButtonstyle: buttonStyle) => setBioPage({
                                ...defaultBioPage,
                                ...bioPage,
                                buttonstyle: newButtonstyle
                            })}
                        />
                        <ColorInput
                            name='Button Color'
                            value={bioPage?.buttoncolor as color}
                            onChange={e => handleInputChange(e, 'buttoncolor')}
                        />
                        <ColorInput
                            name='Button Text Color'
                            value={bioPage?.buttontextcolor as color}
                            onChange={e => handleInputChange(e, 'buttontextcolor')}
                        />
                        <ColorInput
                            name='Button Border Color'
                            value={bioPage?.buttonbordercolor as color}
                            onChange={e => handleInputChange(e, 'buttonbordercolor')}
                        />
                    </Card>
                </div>
                <div className='w-full p-4'>
                    <div className='mb-1'>
                        <span>
                            Preview
                        </span>
                    </div>
                    <div
                        className='w-full p-2'
                        style={{
                            border: 'dashed 1px black',
                            borderRadius: '8px'
                        }}
                    >
                        <BioPage
                            bioPage={bioPage as T_BioPage}
                            setBioPage={setBioPage}
                            blobUrl={blobUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
