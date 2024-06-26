import BlackTransparentOverlay from './BlackTransparentOverlay';

export default function YesNoPopup({ text, disabled, onClickYes, onClickNo }: {
    text: string,
    disabled: boolean
    onClickYes: Function
    onClickNo: Function,
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
                    <button disabled={disabled} onClick={e => onClickYes(e)}>
                        Yes
                    </button>
                    <button disabled={disabled} onClick={e => onClickNo(e)}>
                        No
                    </button>
                </div>
            </div>
        </BlackTransparentOverlay>
    )
}
