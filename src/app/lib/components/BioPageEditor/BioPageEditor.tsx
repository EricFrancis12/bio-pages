'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { updateBioPageAction } from '../../actions';
import { BioPage as T_BioPage, Button, buttonStyle, Click, fontFamily, color } from '../../types';
import BioPage from '../BioPage';
import Card from './Card';
import TextInput from './TextInput';
import ImageEditor from './ImageEditor';
import ColorInput from './ColorInput';
import ButtonSelect from './ButtonSelect';
import FontPicker from '../FontPicker';
import ButtonsEditor from './ButtonsEditor';
import SaveButton from './SaveButton';
import { uploadImageFile, deleteImageFile } from '../../data';
import { objectsAreStructurallyIdentical } from '../../utils/utils';
import SettingsMenu from './SettingsMenu';

export default function BioPageEditor({ bioPage: _bioPage, demoMode }: {
    bioPage: T_BioPage,
    demoMode?: boolean
}) {
    const originalBioPage = useRef(_bioPage);

    const [bioPage, setBioPage] = useState<T_BioPage>(_bioPage);
    const [loading, setLoading] = useState<boolean>(false);
    const [blobUrl, setBlobUrl] = useState<string>('');
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false);

    const defaultBioPage = {
        _id: bioPage?._id as string,
        user_id: bioPage?.user_id as string,
        name: bioPage?.name as string,
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

    function handleColorChange(
        newColor: color,
        bioPageKey: string
    ) {
        setBioPage({
            ...defaultBioPage,
            ...bioPage,
            [bioPageKey]: newColor
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
                            value={bioPage?.name}
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
                            value={bioPage?.headingtext}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'headingtext')}
                        />
                        <TextInput
                            type='textarea'
                            text='Bio'
                            value={bioPage?.subheadingtext}
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
                            onChange={(newColor: color) => handleColorChange(newColor, 'textcolor')}
                        />
                        <ColorInput
                            name='Background Color'
                            value={bioPage?.backgroundcolor as color}
                            onChange={(newColor: color) => handleColorChange(newColor, 'backgroundcolor')}
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
                            onChange={(newColor: color) => handleColorChange(newColor, 'buttoncolor')}
                        />
                        <ColorInput
                            name='Button Text Color'
                            value={bioPage?.buttontextcolor as color}
                            onChange={(newColor: color) => handleColorChange(newColor, 'buttontextcolor')}
                        />
                        <ColorInput
                            name='Button Border Color'
                            value={bioPage?.buttonbordercolor as color}
                            onChange={(newColor: color) => handleColorChange(newColor, 'buttonbordercolor')}
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
                            bioPage={bioPage as T_BioPage}
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
