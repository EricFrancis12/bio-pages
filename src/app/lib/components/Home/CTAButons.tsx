import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import CTAButton from '@/app/lib/components/CTAButton';
import { TColor } from '@/app/lib/types';

const ctaButtons: {
    text: string,
    href: string,
    target: '' | '_blank',
    color: TColor,
    icon: IconDefinition | null,
}[] = [
        {
            text: 'View Demo',
            href: '/demo/dashboard',
            target: '_blank',
            color: 'white',
            icon: faArrowUpRightFromSquare
        },
        {
            text: 'Get Started',
            href: '/dashboard',
            target: '',
            color: 'rgb(213, 89, 14)',
            icon: null
        }
    ];

export default function CTAButons() {
    return (
        <>
            {ctaButtons.map((ctaButton, index) => (
                <CTAButton key={index}
                    text={ctaButton.text}
                    href={ctaButton.href}
                    target={ctaButton.target}
                    borderColor={ctaButton.color}
                    icon={ctaButton.icon as IconDefinition}
                />
            ))}
        </>
    )
}
