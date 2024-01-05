

export default function SaveButton(props: {
    onClick: Function,
    disabled?: boolean,
    loading?: boolean
}) {
    const { onClick, disabled, loading } = props

    async function handleButtonClick(e: any) {
        if (disabled) return;
        onClick();
    }

    return (
        <div>
            {!loading
                ? <button
                    className={(disabled || loading) ? '' : 'cursor-pointer '}
                    disabled={disabled || loading}
                    onClick={e => handleButtonClick(e)}
                >
                    Save Changes
                </button>
                : 'loading...'
            }
        </div>
    )
}
