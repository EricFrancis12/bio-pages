import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import NavLinks from './NavLinks';

export default function SideNav() {
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2'>
            <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
                <NavLinks />
                <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block' />
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <button className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
                        <FontAwesomeIcon icon={faPowerOff} />
                        <div className='hidden md:block'>
                            Sign Out
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}