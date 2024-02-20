'use client';

import { useState, useRef, useEffect } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import type { TColor } from '../../types';
import { traverseParentsForRef, rgbaToHex } from '../../utils/utils';

export default function ColorInput({ name, value, onChange }: {
    name: string,
    value: TColor,
    onChange: (value: string) => void
}) {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (ignoreNextGlobalClick.current === true) {
                ignoreNextGlobalClick.current = false;
                return;
            }
            if (traverseParentsForRef(e.target as HTMLElement, outerRef as React.MutableRefObject<HTMLElement>)) {
                return;
            }
            setOpen(false);
        }
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    const ignoreNextGlobalClick = useRef(false);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (traverseParentsForRef(e.target as HTMLElement, innerRef as React.MutableRefObject<HTMLElement>)) {
            return;
        }
        ignoreNextGlobalClick.current = true;
        setOpen(!open);
    }

    const formatColor = (color: TColor) => {
        if (color.includes('gradient')) {
            return 'Gradient';
        }
        return rgbaToHex(value);
    }

    return (
        <div className='flex flex-col justify-start items-start gap-2 w-full'>
            <div className='flex justify-center items-center'>
                <span>
                    {name}
                </span>
            </div>
            <div ref={outerRef}
                className='flex justify-start items-center gap-2 w-full bg-gray-300 px-2'
                style={{
                    borderRadius: '8px'
                }}
            >
                <div
                    className='relative flex justify-center items-center p-3 cursor-pointer'
                    style={{
                        background: value,
                        border: 'solid black 1px',
                        borderRadius: '25%'
                    }}
                    onClick={e => handleClick(e)}
                >
                    {open &&
                        <div ref={innerRef}
                            className='absolute p-4 bg-white'
                            style={{
                                top: '100%',
                                left: 0,
                                border: 'solid black 1px',
                                borderRadius: '8px',
                                zIndex: open ? 500 : 0
                            }}
                        >
                            <ColorPicker value={value} onChange={onChange} className='' />
                        </div>
                    }
                </div>
                <div className='flex justify-start items-center h-[40px] w-full px-4'>
                    <span>
                        {formatColor(value)}
                    </span>
                </div>
            </div>
        </div>
    )
}
