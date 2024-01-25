import { CSSProperties } from 'react';

export default function BlackTransparentOverlay({ layer = 1, className = '', style = {}, children, disabled }: {
    layer?: number,
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode,
    disabled?: boolean
}) {
    const zIndex = parseFloat(String(layer)) * 1000;

    return (
        <>
            <div className={disabled ? '' : 'absolute bg-black opacity-60'}
                style={
                    disabled
                        ? {}
                        : { top: 0, left: 0, height: '100vh', width: '100%', pointerEvents: 'none', zIndex, ...style }
                }
            />
            <div className={disabled ? '' : ('absolute ' + className)}
                style={
                    disabled
                        ? {}
                        : { top: 0, left: 0, height: '100vh', width: '100%', zIndex: zIndex + 10 }}
            >
                {children}
            </div >
        </>
    )
}
