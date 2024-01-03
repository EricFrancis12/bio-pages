import { useRef, useEffect, ChangeEventHandler, ReactHTMLElement } from 'react';
import { color } from '../../types';

export default function ColorInput(props: {
    name: string,
    value: color,
    onChange: ChangeEventHandler<HTMLInputElement>
}) {
    const { name, value, onChange } = props;

    return (
        <div className='flex flex-col justify-start items-start gap-2 w-full'>
            <div className='flex justify-center items-center'>
                <span>
                    {name}
                </span>
            </div>
            <div className='flex justify-start items-center gap-2 w-full'>
                <div className='flex justify-center items-center p-1'>
                    <input
                        type='color'
                        className='h-[50px] w-[50px]'
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div
                    className='flex justify-start items-center h-[40px] w-full px-4 bg-gray-300'
                    style={{ borderRadius: '8px' }}
                >
                    <span>
                        {value}
                    </span>

                    {/* Starter code for when want to impliment color input via typing: */}
                    {/* <input
                        className='px-1 bg-transparent text-sm'
                        style={{ outline: 'none' }}
                        value={value}
                        onChange={onChange}
                    /> */}
                </div>
            </div>
        </div>
    )
}
