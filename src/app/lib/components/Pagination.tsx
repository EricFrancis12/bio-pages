import { generatePagination } from '../utils';

export default function Pagination(props: {
    className?: string,
    style?: object,
    currentPage: number,
    setCurrentPage: Function,
    totalNumPages: number
}) {
    const { className, style, currentPage, setCurrentPage, totalNumPages } = props;

    const pagination = generatePagination(currentPage, totalNumPages);

    return (
        <div
            className={'flex justify-between items-center w-full px-1 ' + className}
            style={{
                ...style
            }}
        >
            <PaginationItem
                paginationItem='<'
                currentPage={currentPage}
                setCurrentPage={() => setCurrentPage(
                    currentPage - 1 <= 0
                        ? 1
                        : currentPage - 1
                )}
                disabled={currentPage - 1 <= 0}
            />
            {pagination.map((paginationItem, index) => (
                <PaginationItem
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

export function PaginationItem(props: {
    paginationItem: number | string,
    currentPage: number,
    setCurrentPage: Function,
    disabled?: boolean
}) {
    const { paginationItem, currentPage, setCurrentPage, disabled } = props;

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
            }
            onClick={e => {
                if (paginationItem === '...' || disabled === true) return;
                setCurrentPage(paginationItem);
            }}
        >
            {paginationItem}
        </div>
    )
}