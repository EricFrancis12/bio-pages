

export default function SaveButton(props: {
    onClick: Function,
    disabled?: boolean
}) {
    const { onClick, disabled } = props

    async function handleButtonClick(e: any) {
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
                onClick={e => handleButtonClick(e)}
            >
                Save Changes
            </button>
        </div>
    )
}
