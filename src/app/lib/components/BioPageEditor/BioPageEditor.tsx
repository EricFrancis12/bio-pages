'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { updateBioPageAction } from '../../actions';
import type { TBioPage, TButton, TButtonStyle } from '../../types';
import BioPage from '../BioPage';
import Card from './Card';
import TextInput from './TextInput';
import ImageEditor from './ImageEditor';
import ColorInput from './ColorInput';
import ButtonSelect from './ButtonSelect';
import FontPicker from '../FontPicker';
import ButtonsEditor from './ButtonsEditor';
import SaveButton from './SaveButton';
import SettingsMenu from './SettingsMenu';
import { uploadImageFile, deleteImageFile } from '../../data';
import { objectsAreStructurallyIdentical } from '../../utils/utils';

export default function BioPageEditor({ bioPage: _bioPage, demoMode }: {
    bioPage: TBioPage,
    demoMode?: boolean
}) {
    const originalBioPage = useRef(_bioPage);

    const [bioPage, setBioPage] = useState<TBioPage>(_bioPage);
    const [loading, setLoading] = useState<boolean>(false);
    const [blobUrl, setBlobUrl] = useState<string>('');
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false);

    const defaultBioPage = {
        _id: bioPage?._id,
        user_id: bioPage?.user_id,
        name: bioPage?.name,
        font: bioPage?.font,
        textcolor: bioPage?.textcolor,
        backgroundcolor: bioPage?.backgroundcolor,
        imagesrc: bioPage?.imagesrc,
        headingtext: bioPage?.headingtext,
        subheadingtext: bioPage?.subheadingtext,
        buttonstyle: bioPage?.buttonstyle,
        buttoncolor: bioPage?.buttoncolor,
        buttontextcolor: bioPage?.buttontextcolor,
        buttonbordercolor: bioPage?.buttonbordercolor,
        buttons: bioPage?.buttons,
        clicks: bioPage?.clicks,
    };

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        bioPageKey: string
    ) {
        setBioPage({
            ...defaultBioPage,
            ...bioPage,
            [bioPageKey]: e.target.value,
        });
    }

    function handleColorChange(
        newColor: string,
        bioPageKey: string,
    ) {
        setBioPage({
            ...defaultBioPage,
            ...bioPage,
            [bioPageKey]: newColor,
        });
    }

    async function handleSaveButtonClick() {
        if (demoMode === true) return;

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
            await updateBioPageAction(
                uploadResult?.url
                    ? {
                        ...bioPage,
                        imagesrc: uploadResult.url,
                    }
                    : bioPage
            );
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className='w-full p-4 bg-slate-200'>
            <div className='flex justify-between items-center'>
                <h1>
                    Edit Bio Page
                </h1>
                <FontAwesomeIcon icon={faGear}
                    className='cursor-pointer'
                    onClick={e => setSettingsMenuOpen(!settingsMenuOpen)}
                />
            </div>
            <div className='flex flex-col lg:flex-row justify-start items-start gap-2 w-full'>
                <div className='h-[100vh] w-full p-4 overflow-y-scroll'>
                    <Card title='Profile'>
                        <TextInput
                            type='input'
                            text='Page Name'
                            value={bioPage.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'name')}
                        />
                        <ImageEditor
                            imagesrc={bioPage?.imagesrc as string}
                            blobUrl={blobUrl}
                            setBlobUrl={setBlobUrl}
                        />
                        <TextInput
                            type='input'
                            text='Headline'
                            value={bioPage.headingtext}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'headingtext')}
                        />
                        <TextInput
                            type='textarea'
                            text='Bio'
                            value={bioPage.subheadingtext}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'subheadingtext')}
                        />
                        <div>
                            {loading
                                ? 'loading...'
                                : <SaveButton
                                    disabled={(objectsAreStructurallyIdentical(bioPage, originalBioPage.current) && !blobUrl)
                                        || demoMode === true}
                                    onClick={() => handleSaveButtonClick()}
                                />
                            }
                        </div>
                    </Card>
                    <Card title='Links'>
                        <ButtonsEditor
                            buttons={bioPage?.buttons as TButton[]}
                            setButtons={(newButtons: TButton[]) => setBioPage({
                                ...bioPage,
                                buttons: structuredClone(newButtons),
                            } as TBioPage)}
                        />
                    </Card>
                    <Card title='Style'>
                        <FontPicker
                            name='Font'
                            value={bioPage.font as string}
                            onValueChange={(font: string) => setBioPage({
                                ...defaultBioPage,
                                ...bioPage,
                                font,
                            })}
                        />
                        <ColorInput
                            name='Font Color'
                            value={bioPage.textcolor}
                            onChange={(newColor) => handleColorChange(newColor, 'textcolor')}
                        />
                        <ColorInput
                            name='Background Color'
                            value={bioPage.backgroundcolor}
                            onChange={(newColor) => handleColorChange(newColor, 'backgroundcolor')}
                        />
                    </Card>
                    <Card title='Buttons'>
                        <ButtonSelect
                            value={bioPage.buttonstyle as TButtonStyle}
                            onValueChange={(newButtonstyle: TButtonStyle) => setBioPage({
                                ...defaultBioPage,
                                ...bioPage,
                                buttonstyle: newButtonstyle,
                            })}
                        />
                        <ColorInput
                            name='Button Color'
                            value={bioPage.buttoncolor}
                            onChange={(newColor) => handleColorChange(newColor, 'buttoncolor')}
                        />
                        <ColorInput
                            name='Button Text Color'
                            value={bioPage.buttontextcolor}
                            onChange={(newColor) => handleColorChange(newColor, 'buttontextcolor')}
                        />
                        <ColorInput
                            name='Button Border Color'
                            value={bioPage.buttonbordercolor}
                            onChange={(newColor) => handleColorChange(newColor, 'buttonbordercolor')}
                        />
                    </Card>
                </div>
                <div className='w-full p-4'>
                    <div className='flex justify-start items-center gap-2 mb-1'>
                        <span>
                            Preview
                        </span>
                        <Link
                            target='_blank'
                            href={demoMode === true
                                ? `/demo/p/${bioPage._id}`
                                : `/p/${bioPage._id}`
                            }
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Link>
                    </div>
                    <div
                        className='w-full p-2'
                        style={{
                            border: 'dashed 1px black',
                            borderRadius: '8px'
                        }}
                    >
                        <BioPage
                            bioPage={bioPage as TBioPage}
                            setBioPage={setBioPage}
                            blobUrl={blobUrl}
                        />
                    </div>
                </div>
            </div>
            {settingsMenuOpen &&
                <SettingsMenu
                    bioPage={bioPage}
                    setBioPage={setBioPage}
                    onClose={e => setSettingsMenuOpen(false)}
                    demoMode={demoMode}
                />
            }
        </div>
    )
}
