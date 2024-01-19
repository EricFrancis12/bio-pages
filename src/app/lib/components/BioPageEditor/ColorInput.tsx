'use client';

import { useState, useRef, useEffect } from 'react';
import ColorSelect from '../ColorSelect';
import { color } from '../../types';
import { traverseParentsForId, rgbaToHex } from '../../utils/utils';

export default function ColorInput(props: {
    name: string,
    value: color,
    onChange: Function
}) {
    const { name, value, onChange } = props;
    const outerId = useRef(crypto.randomUUID());
    const innerId = useRef(crypto.randomUUID());

    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    const ignoreNextGlobalClick = useRef(false);
    function handleGlobalClick(e: MouseEvent) {
        if (ignoreNextGlobalClick.current === true) {
            ignoreNextGlobalClick.current = false;
            return;
        }
        if (traverseParentsForId(e.target as HTMLElement, outerId.current)
            || traverseParentsForId(e.target as HTMLElement, innerId.current)) {
            return;
        }
        setOpen(false);
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (traverseParentsForId(e.target as HTMLElement, innerId.current)) {
            return;
        }
        ignoreNextGlobalClick.current = true;
        setOpen(!open);
    }

    const formatColor = (color: color) => {
        if (color.includes('gradient')) {
            return 'Gradient';
        }
        return rgbaToHex(value);
    }

    return (
        <div
            className='flex flex-col justify-start items-start gap-2 w-full'
        >
            <div className='flex justify-center items-center'>
                <span>
                    {name}
                </span>
            </div>
            <div id={outerId.current}
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
                        <div id={innerId.current}
                            className='absolute bg-white p-4'
                            style={{
                                top: '100%',
                                left: 0,
                                border: 'solid black 1px',
                                borderRadius: '8px',
                                zIndex: open ? 500 : 0
                            }}
                        >
                            <ColorSelect
                                color={value}
                                setColor={onChange}
                            />
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
