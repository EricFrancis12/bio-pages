'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ searchQuery, setSearchQuery }: {
    searchQuery: string,
    setSearchQuery: Function
}) {
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }

    return (
        <div className='relative flex flex-1 flex-shrink-0'>
            <label htmlFor='search' className='sr-only'>
                Search
            </label>
            <input
                placeholder='Search...'
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                value={searchQuery}
                onChange={e => handleInputChange(e)}
            />
            <span className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
        </div>
    )
}
