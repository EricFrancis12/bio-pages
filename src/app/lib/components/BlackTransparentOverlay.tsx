

export default function BlackTransparentOverlay(props: {
    layer?: number,
    className?: string,
    children?: React.ReactNode,
    disabled?: boolean
}) {
    const { layer = 1, className = '', children, disabled } = props;

    const zIndex = parseFloat(String(layer)) * 1000;

    return (
        <>
            <div className={disabled ? '' : 'absolute opacity-60 bg-black'}
                style={
                    disabled
                        ? {}
                        : { top: 0, left: 0, height: '100vh', width: '100vw', pointerEvents: 'none', zIndex }
                }
            />
            <div className={disabled ? '' : ('absolute ' + className)}
                style={
                    disabled
                        ? {}
                        : { top: 0, left: 0, height: '100vh', width: '100vw', zIndex: zIndex + 10 }}
            >
                {children}
            </div >
        </>
    )
}
