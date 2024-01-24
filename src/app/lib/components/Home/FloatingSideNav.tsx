import Link from 'next/link';
import Image from 'next/image';

export default function FloatingSideNav() {
    const iconLinks = [
        {
            href: 'https://github.com',
            src: '/assets/img/github-logo.png',
            alt: 'Github Icon',
        },
        {
            href: 'https://discord.com',
            src: '/assets/img/discord-logo.png',
            alt: 'Discord Icon',
        },
        {
            href: 'https://twitter.com',
            src: '/assets/img/twitter-logo.png',
            alt: 'Twitter Icon',
        }
    ];

    const IconLink = ({ href, src, alt }: {
        href: string,
        src: string,
        alt: string
    }) => (
        <Link
            href={href}
            target='_blank'
            className='bg-transparent p-1'
        >
            <Image
                height={25}
                width={25}
                src={src}
                alt={alt}
                loading='lazy'
            />
        </Link>
    );

    return (
        <div
            className='fixed bottom-[5%] right-[5%] hidden md:flex flex-col justify-between items-center gap-2 p-1 bg-[#363636] rounded-3xl'
            style={{
                zIndex: 500
            }}
        >
            {iconLinks.map((iconLink, index) => (
                <IconLink key={index}
                    href={iconLink.href}
                    src={iconLink.src}
                    alt={iconLink.alt}
                />
            ))}
        </div>
    )
}
