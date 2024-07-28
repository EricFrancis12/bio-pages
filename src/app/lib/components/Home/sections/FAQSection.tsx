'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Faq = {
    question: string | React.ReactNode,
    answer: string | React.ReactNode,
    expanded: boolean
};

const initialFaqs: Faq[] = [
    {
        question: 'What is a link-in-bio tool, and why do I need it?',
        answer: 'A link-in-bio tool helps you optimize your social media presence by allowing you to share multiple links through a single, customizable landing page. It simplifies navigation for your followers.',
        expanded: false,
    },
    {
        question: 'Is it free to use?',
        answer: 'We currently offer a free plan with essential features to all users. In the future, we may add premium plans with additional customization options and analytics for those who want more advanced capabilities.',
        expanded: false,
    },
    {
        question: 'Can I customize the appearance of my page?',
        answer: 'Absolutely! A wide range of customization options are available, allowing you to personalize the look and feel of your link page. Choose colors, fonts, backgrounds, button styles, and more to best represent your brand.',
        expanded: false,
    },
    {
        question: 'Can I track the performance of my links?',
        answer: 'Yes, you have access to analytics in your dashboard. Track clicks, user engagement, and other valuable insights to understand how your audience interacts with your links.',
        expanded: false,
    },
    {
        question: 'Is it mobile friendly?',
        answer: 'Absolutely! All pages are designed to be fully responsive, ensuring a seamless and user-friendly experience for your followers on both desktop and mobile devices.',
        expanded: false,
    },
    {
        question: 'How do I add or remove links from my page?',
        answer: "Managing your links is easy. Log in to your user dashboard and you'll be able to add, edit, or remove links with just a few clicks.",
        expanded: false,
    },
    {
        question: 'Can I use this for business or personal purposes?',
        answer: "The app is ideal for both your business and personal purposes. Whether you're promoting products, services, or sharing personal content, your pages can be tailored specifically to fit your needs.",
        expanded: false,
    },
    {
        question: 'How secure is my personal information?',
        answer: 'We take security very seriously. All of your personal information is encrypted, and we follow industry best practices to securely store your data.',
        expanded: false,
    },
];

export default function FAQSection() {
    const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

    function handleDropdownClick(faq: Faq) {
        const newFaqs = faqs.map(_faq => {
            if (_faq === faq) {
                return {
                    ..._faq,
                    expanded: !_faq.expanded,
                };
            }
            return {
                ..._faq,
                expanded: false,
            };
        })
        setFaqs(newFaqs);
    }

    return (
        <div className='px-4 py-32'>
            <h2 className='text-center mb-24'>
                Frequently Asked Questions
            </h2>
            <div className='flex flex-col justify-start items-center gap-8 px-2'>
                {faqs.map((faq, index) => (
                    <QuestionDropdown key={index}
                        faq={faq}
                        onClick={() => handleDropdownClick(faq)}
                    />
                ))}
            </div>
        </div>
    )
}

const QuestionDropdown = ({ faq, onClick }: {
    faq: Faq,
    onClick: React.MouseEventHandler<HTMLDivElement>
}) => {
    return (
        <div className='relative flex flex-col justify-start items-center gap-6 w-full max-w-[600px] pl-8 pr-3 py-6 bg-red-400 rounded-xl'>
            <div
                className='flex justify-between items-center w-full text-xl font-bold cursor-pointer'
                onClick={onClick}
            >
                <div>{faq.question}</div>
                <FontAwesomeIcon icon={faq.expanded ? faChevronUp : faChevronDown} />
            </div>
            {faq.expanded &&
                <div className='flex justify-center items-center w-full'>
                    {faq.answer}
                </div>
            }
        </div>
    )
};
