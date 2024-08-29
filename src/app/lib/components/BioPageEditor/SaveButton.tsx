

export default function SaveButton({ onClick, disabled }: {
    onClick: () => void,
    disabled?: boolean,
}) {
    function handleButtonClick() {
        if (!disabled) onClick();
    }

    return (
        <div className={(disabled ? 'opacity-50' : 'hover:opacity-70')
            + ' px-2 py-1 rounded-lg bg-green-400 border border-black'}>
            <button
                className={(disabled ? '' : 'cursor-pointer')}
                disabled={disabled}
                onClick={handleButtonClick}
            >
                Save Changes
            </button>
        </div>
    )
}
