

export default function SaveButton({ onClick, disabled }: {
    onClick: Function,
    disabled?: boolean
}) {
    async function handleButtonClick() {
        if (disabled) return;
        onClick();
    }

    return (
        <div>
            <button
                className={(disabled ? '' : 'cursor-pointer')}
                style={{
                    border: disabled ? 'none' : 'solid black 1px'
                }}
                disabled={disabled}
                onClick={handleButtonClick}
            >
                Save Changes
            </button>
        </div>
    )
}
