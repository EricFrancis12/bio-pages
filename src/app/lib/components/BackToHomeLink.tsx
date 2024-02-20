import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackToHomeLink() {
    return (
        <Link
            className='flex items-center gap-2 m-4 text-black hover:opacity-70'
            href='/'
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>
                Back to home
            </span>
        </ Link>
    )
}
