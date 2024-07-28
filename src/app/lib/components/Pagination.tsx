import { generatePagination } from '../utils/utils';

export default function Pagination({ className, style, currentPage, setCurrentPage, totalNumPages }: {
    className?: string,
    style?: object,
    currentPage: number,
    setCurrentPage: (newPage: number) => void,
    totalNumPages: number,
}) {
    const pagination = generatePagination(currentPage, totalNumPages);

    function handleSetCurrentPage() {
        setCurrentPage(
            currentPage - 1 <= 0
                ? 1
                : currentPage - 1
        );
    }

    return (
        <div
            className={'flex justify-between items-center ' + className}
            style={style}
        >
            <PaginationItem
                paginationItem='<'
                currentPage={currentPage}
                setCurrentPage={handleSetCurrentPage}
                disabled={currentPage - 1 <= 0}
            />
            {pagination.map((paginationItem, index) => (
                <PaginationItem
                    key={index}
                    paginationItem={paginationItem}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ))}
            <PaginationItem
                paginationItem='>'
                currentPage={currentPage}
                setCurrentPage={() => setCurrentPage(
                    currentPage + 1 > totalNumPages
                        ? totalNumPages
                        : currentPage + 1
                )}
                disabled={currentPage + 1 > totalNumPages}
            />
        </div>
    )
}

export function PaginationItem({ paginationItem, currentPage, setCurrentPage, disabled }: {
    paginationItem: number | string,
    currentPage: number,
    setCurrentPage: (newPage: number) => void,
    disabled?: boolean,
}) {
    function handleClick() {
        if (typeof paginationItem === 'string' || disabled === true) return;
        setCurrentPage(paginationItem);
    }

    return (
        <div
            className={
                (currentPage === paginationItem
                    ? 'text-green-500 '
                    : ' '
                )
                + ((paginationItem !== '...' && disabled !== true)
                    ? ' hover:underline cursor-pointer'
                    : ' '
                )
                + (disabled ? ' text-gray-400 cursor-not-allowed' : ' text-black')
            }
            onClick={handleClick}
        >
            {paginationItem}
        </div>
    )
}

export function filterByCurrentPage<T>(pages: T[], currentPage: number, numItemsPerPage: number): T[] {
    return pages.filter((_: unknown, index: number) => {
        return (index < currentPage * numItemsPerPage && index >= (currentPage - 1) * numItemsPerPage);
    });
}

export function calcTotalNumPages(_: unknown[], numItemsPerPage: number) {
    return Math.ceil(_.length / numItemsPerPage);
}
