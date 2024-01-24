import Link from 'next/link';

export default function NavButton({ text, href }: {
    text: string,
    href: string
}) {
    return (
        <Link
            href={href}
            className='flex justify-center items-center w-[100px] py-2 text-gray-600 bg-gray-100'
            style={{
                border: 'solid 3px grey',
                borderRadius: '8px'
            }}
        >
            {text}
        </Link>
    )
}
