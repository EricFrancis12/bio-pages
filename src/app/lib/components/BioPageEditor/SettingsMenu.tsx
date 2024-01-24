import { MouseEventHandler } from 'react';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import ShortLinkEditor from './ShortLinkEditor';
import { BioPage } from '../../types';

export default function SettingsMenu({ bioPage, setBioPage, onClose }: {
    bioPage: BioPage,
    setBioPage: Function,
    onClose: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <BlackTransparentOverlay className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-2 bg-red-400'>
                <ShortLinkEditor
                    value={bioPage?._id as string}
                    onValueChange={(newBioPage_id: string) => setBioPage({
                        ...bioPage,
                        _id: newBioPage_id
                    } as BioPage)}
                />
                <div>
                    <button onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </BlackTransparentOverlay>
    )
}
