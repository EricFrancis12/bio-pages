

export default function SaveButton({ onClick, disabled }: {
    onClick: () => void,
    disabled?: boolean,
}) {
    function handleButtonClick() {
        if (!disabled) onClick();
    }

    return (
        <div>
            <button
                className={(disabled ? '' : 'cursor-pointer')}
                style={{ border: disabled ? 'none' : 'solid black 1px' }}
                disabled={disabled}
                onClick={handleButtonClick}
            >
                Save Changes
            </button>
        </div>
    )
}
