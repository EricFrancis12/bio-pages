import { CSSProperties } from 'react';

const OVERLAY_Z_INDEX_LAYER_SCALE = 1000;
const OVERLAY_GAP = 10;

export default function BlackTransparentOverlay({ layer = 1, className = '', style = {}, children, disabled }: {
    layer?: number,
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode,
    disabled?: boolean
}) {
    const zIndex = parseFloat(String(layer)) * OVERLAY_Z_INDEX_LAYER_SCALE;

    const lowerOverlayStyle: CSSProperties = {
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        pointerEvents: 'none',
        zIndex,
        ...style,
    };

    const upperOverlayStyle: CSSProperties = {
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        zIndex: zIndex + OVERLAY_GAP,
    };

    return (
        <>
            <div
                className={disabled ? '' : 'absolute bg-black opacity-60'}
                style={disabled ? {} : lowerOverlayStyle}
            />
            <div
                className={disabled ? '' : ('absolute ' + className)}
                style={disabled ? {} : upperOverlayStyle}
            >
                {children}
            </div >
        </>
    )
}
