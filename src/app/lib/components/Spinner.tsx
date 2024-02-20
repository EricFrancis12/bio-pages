import Image from 'next/image';
import SpinnerGif from '../../../../public/assets/img/spinner.gif';

export default function Spinner() {
    return (
        <div className='flex justify-center items-center gap-2 w-full'>
            <Image
                alt='Spinner'
                src={SpinnerGif}
                height={20}
                width={20}
            />
            <span>
                Loading...
            </span>
        </div>
    )
}
