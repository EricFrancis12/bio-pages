import { useState, useEffect } from 'react';

export default function ToggleSwitch({ defaultValue, value, size = 25, onValueChange }: {
    defaultValue?: boolean,
    value: boolean,
    size?: number,
    onValueChange?: Function
}) {
    const [active, setActive] = useState<boolean>(value ?? defaultValue ?? true);

    useEffect(() => {
        setActive(value);
    }, [value]);

    function handleClick() {
        setActive(!active);
        if (onValueChange) onValueChange(active);
    }

    return (
        <div
            className='relative'
            style={{
                height: `${size}px`,
                width: `${size * 2}px`,
                border: 'solid black 2px',
                borderRadius: '25px',
                backgroundColor: active ? 'green' : 'gray',
                transition: 'background-color 0.3s ease-in-out'
            }}
        >
            <div
                className='absolute h-full w-[50%] bg-white cursor-pointer'
                style={{
                    borderRadius: '25px',
                    top: 0,
                    left: active ? '50%' : 0,
                    transition: 'left 0.3s ease-in-out'
                }}
                onClick={e => handleClick()}
            >

            </div>
        </div>
    )
}
