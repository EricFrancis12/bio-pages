import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { color } from '../types';

export default function CTAButton({ text, href, target = '', borderColor = 'white', icon }: {
    text: string,
    href: string,
    target?: '' | '_blank',
    borderColor?: color,
    icon?: IconDefinition
}) {
    return (
        <Link
            href={href}
            target={target}
            className='relative flex justify-center items-center gap-2 text-md md:text-xl lg:text-2xl font-bold px-2 lg:px-8 py-2 text-white hover:text-black bg-black hover:bg-violet-600'
            style={{
                outline: `solid 1.5px ${borderColor}`,
                borderRadius: '8px',
                transition: 'ease-in-out 0.5s color; ease-in-out 0.5s background-color',
            }}
        >
            <div
                className='absolute h-full w-full opacity-[50%]'
                style={{
                    outline: `solid 3px ${borderColor}`,
                    borderRadius: '8px',
                    filter: 'blur(3px)'
                }}
            />
            <span className='text-3xl'>
                {text}
            </span>
            {icon &&
                <FontAwesomeIcon icon={icon} />
            }
        </Link>
    )
}
