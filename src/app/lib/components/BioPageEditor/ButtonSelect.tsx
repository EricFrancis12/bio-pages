import { useState, useEffect } from 'react';
import type { buttonStyle, buttonStyleType, buttonStyleRadius } from '../../types';
import { deconstructButtonStyle, calcButtonStyleTypeShadows } from '../../utils/utils';

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
                name: 'No Shadow',
                type: 'no_shadow'
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

    function ButtonStyleButton(props: {
        type: buttonStyleType,
        radius: buttonStyleRadius
    }) {
        const { type, radius } = props;

        return (
            <div className='w-full' style={{
                outline: (buttonstyleType === type && buttonstyleRadius === radius) ? 'solid black 1px' : 'none'
            }}
                onClick={e => setSelectedButton({ type, radius })}
            >
                <div
                    className={(calcButtonStyleTypeShadows(type))
                        + ' h-[30px] m-2 p-2 bg-gray-400 cursor-pointer'}
                    style={{
                        border: 'solid black 1px',
                        borderRadius: `${radius}px`
                    }}
                />
            </div>
        )
    }

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
                            <ButtonStyleButton
                                type={row.type}
                                radius={0}
                            />
                            <ButtonStyleButton
                                type={row.type}
                                radius={8}
                            />
                            <ButtonStyleButton
                                type={row.type}
                                radius={15}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
