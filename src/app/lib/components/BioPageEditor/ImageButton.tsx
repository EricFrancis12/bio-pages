import { MouseEventHandler } from 'react';

export default function ImageButton(props: {
    name: string,
    bg?: string,
    onClick: MouseEventHandler<HTMLDivElement>
}) {
    const { name, bg, onClick } = props;

    return (
        <div className={(bg ?? 'bg-green-300')
            + ' flex justify-center items-center w-full max-w-[200px] py-2 cursor-pointer'}
            style={{ borderRadius: '25px' }}
            onClick={onClick}
        >
            <span>
                {name}
            </span>
        </div>
    )
}
