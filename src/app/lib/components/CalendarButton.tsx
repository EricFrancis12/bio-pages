'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import { traverseParentsForClass } from '../utils/utils';
import { TTimerange } from '../types';
import { formatDatesRange } from '../utils/timerange-utils';

export const IGNORE_CALENDAR_CLICK_CLASS = 'IGNORE_CALENDAR_CLICK_CLASS';

export default function CalendarButton({ timerange, setTimerange }: {
    timerange: TTimerange,
    setTimerange: Function
}) {
    const [workingTimerange, setWorkingTimerange] = useState<TTimerange>(structuredClone(timerange));
    const [expanded, setExpanded] = useState<boolean>(false);

    const calendarButtonElement = useRef<HTMLDivElement | null>(null);

    const ignoreNextGlobalClick = useRef<boolean>(false);
    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);

        function handleGlobalClick(e: MouseEvent) {
            if (ignoreNextGlobalClick.current === true) {
                ignoreNextGlobalClick.current = false;
                return;
            }
            if (traverseParentsForClass(e.target as HTMLElement, IGNORE_CALENDAR_CLICK_CLASS)) {
                return;
            }
            setExpanded(false);
        }
    }, []);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (traverseParentsForClass(e.target as HTMLElement, IGNORE_CALENDAR_CLICK_CLASS)
            && e.target !== calendarButtonElement.current
        ) {
            return;
        }

        ignoreNextGlobalClick.current = true;
        setExpanded(!expanded);
    }

    function handleApplyButtonClick() {
        setTimerange(structuredClone(workingTimerange));
        setExpanded(false);
    }

    return (
        <div
            ref={calendarButtonElement}
            className={IGNORE_CALENDAR_CLICK_CLASS +
                ' relative px-2 py-1 cursor-pointer'}
            style={{
                border: 'solid black 1px',
                borderRadius: '8px',
            }}
            onClick={handleClick}
        >
            <span style={{ pointerEvents: 'none' }}>
                {formatDatesRange(timerange)}
            </span>
            {expanded &&
                <div
                    className='absolute flex flex-col justify-center items-center bg-white'
                    style={{
                        top: '100%',
                        left: 0,
                        border: 'solid black 1px',
                        borderRadius: '8px',
                    }}
                >
                    <DateRangePicker
                        onChange={item => setWorkingTimerange(item.selection as TTimerange)}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[workingTimerange]}
                        direction="horizontal"
                    />
                    <div>
                        <button onClick={() => handleApplyButtonClick()}>
                            Apply
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
