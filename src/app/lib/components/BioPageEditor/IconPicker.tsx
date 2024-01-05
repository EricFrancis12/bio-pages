import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { traverseParentsForClass, camelCaseToLowerCaseWithSpaces, generatePagination } from '../../utils';
import Pagination from '../Pagination';

export const IGNORE_CLICK_CLASS = 'IGNORE_CLICK_CLASS';
export const NUM_ICONS_PER_PAGE = 50;

export default function IconPicker(props: {
    value: string,
    onValueChange: Function
}) {
    const { value, onValueChange } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    const ignoreNextGlobalClick = useRef(false);
    function handleGlobalClick(e: any) {
        if (ignoreNextGlobalClick.current === true) {
            ignoreNextGlobalClick.current = false;
            return;
        }

        if (traverseParentsForClass(e.target, IGNORE_CLICK_CLASS)) {
            return;
        }

        setOpen(false);
        setSearchQuery('');
    }

    function handleClick(e: any) {
        ignoreNextGlobalClick.current = true;
        setOpen(!open);
    }

    const filteredIcons = Object.keys(icons)
        .filter((iconValue) =>
            camelCaseToLowerCaseWithSpaces(iconValue?.split('fa')?.at(-1) as string)
                .includes(searchQuery.toLowerCase())
        );

    const totalNumPages = Math.ceil(filteredIcons.length / NUM_ICONS_PER_PAGE);
    const icon = icons[value as keyof typeof icons];

    return (
        <div className='relative'>
            <div
                className='flex justify-center items-center h-[30px] w-[30px] bg-white hover:bg-gray-300 cursor-pointer'
                style={{
                    border: 'solid black 1px',
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease'
                }}
                onClick={e => handleClick(e)}
            >
                <FontAwesomeIcon icon={icon as IconDefinition} />
            </div>
            {open &&
                <div
                    className='absolute flex flex-col justify-between items-center min-h-[300px] w-[170px] p-1 bg-white'
                    style={{
                        border: 'solid black 1px',
                        borderRadius: '8px',
                        zIndex: 100
                    }}
                >
                    <div>
                        <div
                            className={IGNORE_CLICK_CLASS + ' w-full py-1'}
                            style={{
                                borderBottom: 'solid black 1px'
                            }}
                        >
                            <input
                                placeholder='search icons'
                                className={IGNORE_CLICK_CLASS + ' w-full px-1'}
                                style={{
                                    border: 'none',
                                    outline: 'none'
                                }}
                                onChange={e => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className='flex flex-wrap justify-center items-start p-1 bg-white'>
                            {filteredIcons
                                .filter((iconValue, index) => {
                                    return (index < (currentPage * NUM_ICONS_PER_PAGE))
                                        && (index > ((currentPage - 1) * NUM_ICONS_PER_PAGE));
                                })
                                .map((iconValue, index) => {
                                    const _icon = icons[iconValue as keyof typeof icons] as IconDefinition;
                                    return (
                                        <div key={index}
                                            className='flex justify-center items-center p-1 cursor-pointer hover:outline'
                                            onClick={e => onValueChange(iconValue)}
                                        >
                                            <FontAwesomeIcon icon={_icon} />
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <Pagination
                        className={IGNORE_CLICK_CLASS}
                        style={{
                            borderTop: 'solid black 1px'
                        }}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalNumPages={totalNumPages}
                    />
                </div>
            }
        </div>
    )
}
