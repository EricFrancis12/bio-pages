import type { TButtonStyle, TButtonStyleType } from '../../types';
import { deconstructButtonStyle, calcButtonStyleTypeShadows } from '../../utils/utils';

const buttonRows: {
    name: string,
    type: TButtonStyleType,
}[] = [
        {
            name: 'No Shadow',
            type: 'no_shadow',
        },
        {
            name: 'Soft Shadow',
            type: 'soft_shadow',
        },
        {
            name: 'Hard Shadow',
            type: 'hard_shadow',
        },
    ];

export default function ButtonSelect({ value, onValueChange }: {
    value: TButtonStyle,
    onValueChange: (newValue: TButtonStyle) => void,
}) {
    const { buttonstyleType, buttonstyleRadius } = deconstructButtonStyle(value);

    const ButtonStyleButton = ({ type, radius }: {
        type: TButtonStyleType,
        radius: number,
    }) => {
        return (
            <div
                className='w-full'
                style={{
                    outline: (buttonstyleType === type && buttonstyleRadius === radius) ? 'solid black 1px' : 'none'
                }}
                onClick={() => onValueChange(`${type}-${radius}`)}
            >
                <div
                    className={(calcButtonStyleTypeShadows(type))
                        + ' h-[30px] m-2 p-2 bg-gray-400 cursor-pointer'}
                    style={{
                        border: 'solid black 1px',
                        borderRadius: `${radius}px`,
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
