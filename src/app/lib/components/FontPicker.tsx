import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { TFontFamily } from '../types';
import { fontsDictionary, fontsArray } from '../fonts';

const FONT_PICKER_Z_INDEX = 500;

export default function FontPicker({ name, value, onValueChange }: {
    name?: string,
    value: TFontFamily,
    onValueChange: (ff: TFontFamily) => void,
}) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleGlobalclick = () => {
            if (ignoreNextGlobalClick.current === true) {
                ignoreNextGlobalClick.current = false;
                return;
            };
            if (expanded) setExpanded(false);
        }

        document.addEventListener('click', handleGlobalclick);
        return () => document.removeEventListener('click', handleGlobalclick);
    }, [expanded]);

    const ignoreNextGlobalClick = useRef(false);

    const font = fontsDictionary[value as keyof typeof fontsDictionary] ?? null;

    return (
        <div className='flex flex-col justify-start items-start gap-2 w-full'>
            {name &&
                <div className='flex justify-center items-center'>
                    <span>
                        {name}
                    </span>
                </div>
            }
            <div
                className='relative cursor-pointer w-full'
                onClick={() => setExpanded(!expanded)}
            >
                <div
                    className='flex justify-start items-center w-full'
                    style={{
                        border: 'solid black 1px',
                        borderRadius: '8px',
                    }}
                >
                    <div className='flex justify-between items-center px-4 py-1 w-full'>
                        <span className={(font?.instance?.className ? font.instance.className : '')}>
                            {font?.name || value}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
                        </span>
                    </div>
                </div>
                <div
                    className={(!expanded ? 'overflow-y-hidden max-h-[0px]' : 'overflow-y-scroll max-h-[200px]')
                        + ' absolute flex flex-col justify-start items-start w-full bg-white'}
                    style={{
                        top: '100%',
                        left: 0,
                        border: expanded ? 'solid black 1px' : '',
                        borderRadius: '8px',
                        transition: 'max-height 0.3s ease',
                        zIndex: FONT_PICKER_Z_INDEX,
                    }}
                >
                    {fontsArray
                        .filter(font => font.family !== value)
                        .map((font, index) => (
                            <div key={index}
                                className='flex justify-start items-center w-full p-1 bg-white'
                                style={{
                                    whiteSpace: 'nowrap',
                                    borderBottom: 'solid grey 1px',
                                }}
                                onClick={() => onValueChange(font.family)}
                            >
                                <span className={font?.instance?.className || ''}>
                                    {font.name}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
