import { useState } from 'react';
import type { Button } from '../../types';

export default function ButtonsEditor(props: {
    buttons: Button[],
    setButtons: Function
}) {
    const { buttons, setButtons } = props;

    const [fromIndex, setFromIndex] = useState<number | null>(null);
    const [toIndex, setToIndex] = useState<number | null>(null);

    function handleDragStart(e: any, index: number) {
        setFromIndex(index);
        setToIndex(index);
    }

    function handleDragEnter(e: any, index: number) {
        setToIndex(index);
    }

    function handleDragEnd(e: any, index: number) {
        // const copyButtons = [...buttons];
        // const fillerButton: Button = { ...buttons[0], text: 'FILLER', url: 'http_FILLER' };
        // const newButton: any = copyButtons.splice(fromIndex ?? 0, 1, fillerButton);
        // const removalIndex: number = (typeof toIndex === 'number' && typeof fromIndex === 'number' && toIndex > fromIndex)
        //     ? toIndex as number + 1
        //     : toIndex as number;
        // copyButtons.splice(removalIndex, 0, newButton as Button);
        // const newButtons = copyButtons.filter(button => button.url !== 'http_FILLER');

        const copyButtons = [...buttons];
        copyButtons.splice(toIndex as number, 0, buttons[fromIndex as number]);
        const removalIndex = (typeof toIndex === 'number' && typeof fromIndex === 'number' && fromIndex < toIndex)
            ? fromIndex
            : fromIndex as number - 1
        copyButtons.splice(removalIndex, 1);

        setFromIndex(null);
        setToIndex(null);
        setButtons(copyButtons);
    }

    return (
        <div>
            {[...buttons, { text: '' }].map((button, index) => (
                <>
                    {(toIndex === index) &&
                        <div id='divider' className='h-[3px] w-[500px] bg-blue-500' />
                    }
                    {(index !== buttons.length)
                        ? <div
                            key={index}
                            className='bg-red-500 cursor-pointer w-full'
                            draggable={true}
                            onDragStart={e => handleDragStart(e, index)}
                            onDragEnter={e => handleDragEnter(e, index)}
                            onDragEnd={e => handleDragEnd(e, index)}
                        >
                            <span>
                                {button.text}
                            </span>
                        </div>
                        : <div
                            className='opacity-0 w-full h-[5px] bg-transparent'
                            onDragEnter={e => handleDragEnter(e, index)}
                            onDragEnd={e => handleDragEnd(e, index)}
                        />
                    }
                </>
            ))}
        </div>
    )
}
