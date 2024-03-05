import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function ComingSoon() {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center gap-2'>
            <h1>Coming Soon!</h1>
            <Link
                href='/'
                className='text-blue-400 hover:opacity-70'
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className='ml-2'>Back to home</span>
            </Link>
        </div>
    )
}
