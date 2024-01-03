import { useState, useEffect } from 'react';
import type { buttonStyle, buttonStyleType, buttonStyleRadius } from '../../types';
import { deconstructButtonStyle } from '../../utils';

export default function ButtonSelect(props: {
    value: buttonStyle,
    onValueChange: Function
}) {
    const { value, onValueChange } = props;
    const { buttonstyleType, buttonstyleRadius } = deconstructButtonStyle(value);

    const [selectedButton, setSelectedButton] = useState<{
        type: buttonStyleType,
        radius: buttonStyleRadius
    }>({
        type: buttonstyleType,
        radius: buttonstyleRadius
    });

    useEffect(() => {
        onValueChange(`${selectedButton.type}-${selectedButton.radius}`);
    }, [selectedButton, selectedButton?.type, selectedButton?.radius]);

    const buttonRows: {
        name: string,
        type: buttonStyleType
    }[] = [
            {
                name: 'Fill',
                type: 'fill'
            },
            {
                name: 'Outline',
                type: 'outline'
            },
            {
                name: 'Soft Shadow',
                type: 'soft_shadow'
            },
            {
                name: 'Hard Shadow',
                type: 'hard_shadow'
            }
        ];

    return (
        <div className='w-full'>
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
                {buttonRows.map((row, index) => (
                    <div key={index} className='flex flex-col justify-start items-start w-full'>
                        <div>
                            <span className='text-sm'>
                                {row.name}
                            </span>
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            <div className='w-full' style={{
                                outline: (buttonstyleType === row.type && buttonstyleRadius === 0) ? 'solid black 1px' : 'none'
                            }}
                                onClick={e => setSelectedButton({ radius: 0, type: row.type })}
                            >
                                <div
                                    className='h-[30px] m-2 p-2 bg-black'
                                    style={{
                                        borderRadius: '0px'
                                    }}
                                />
                            </div>
                            <div className='w-full' style={{
                                outline: (buttonstyleType === row.type && buttonstyleRadius === 8) ? 'solid black 1px' : 'none'
                            }}
                                onClick={e => setSelectedButton({ radius: 8, type: row.type })}
                            >
                                <div
                                    className='h-[30px] m-2 p-2 bg-black'
                                    style={{
                                        borderRadius: '8px'
                                    }}
                                />
                            </div>
                            <div className='w-full' style={{
                                outline: (buttonstyleType === row.type && buttonstyleRadius === 15) ? 'solid black 1px' : 'none'
                            }}
                                onClick={e => setSelectedButton({ radius: 15, type: row.type })}
                            >
                                <div
                                    className='h-[30px] m-2 p-2 bg-black'
                                    style={{
                                        borderRadius: '15px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
