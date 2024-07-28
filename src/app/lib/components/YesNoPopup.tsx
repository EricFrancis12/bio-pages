import BlackTransparentOverlay from './BlackTransparentOverlay';

type OnClickFunc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export default function YesNoPopup({ text, disabled, onClickYes, onClickNo }: {
    text: string,
    disabled: boolean,
    onClickYes: OnClickFunc,
    onClickNo: OnClickFunc,
}) {
    return (
        <BlackTransparentOverlay className='flex justify-center items-center'>
            <div className='flex flex-col justify-start items-center p-2 bg-white'>
                <div>
                    <p>
                        {text}
                    </p>
                </div>
                <div className='flex justify-around items-center w-full'>
                    <button disabled={disabled} onClick={onClickYes}>
                        Yes
                    </button>
                    <button disabled={disabled} onClick={onClickNo}>
                        No
                    </button>
                </div>
            </div>
        </BlackTransparentOverlay>
    )
}
