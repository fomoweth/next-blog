import Link from "next/link";

interface Props {
    current: number;
    total: number;
}

const PAGINATION_LIMIT = 5;

const getPages = (current: number, total: number, limit: number) => {
    const step = Math.floor((limit - 1) / 2);

    let firstPage = current - step;

    if (total <= limit || firstPage <= 1) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const lastPage = firstPage + limit - 1;

    if (lastPage > total) {
        firstPage -= lastPage - total;
    }

    return Array.from({ length: limit }, (_, i) => i + firstPage);
};

export default function Pagination({ current, total }: Props) {
    const pages = getPages(current, total, PAGINATION_LIMIT);
    const step = Math.floor((PAGINATION_LIMIT - 1) / 2);

    let prev = current < 2 ? undefined : current - step;
    if (!!prev && prev < 1) {
        prev = 1;
    }

    let next = current === total ? undefined : pages.length + step;
    if (!!next && next > total) {
        next = total;
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
                {!!prev ? (
                    <li>
                        <Link
                            href={`/posts/page/${prev}`}
                            className="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    </li>
                ) : null}
                {pages.map((page, idx) => (
                    <li key={idx}>
                        <Link
                            href={`/posts/page/${page}`}
                            className={
                                page === current
                                    ? "z-10 border border-blue-300 bg-blue-50 px-3 py-2 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "border border-gray-300 px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }
                        >
                            {page}
                        </Link>
                    </li>
                ))}
                {!!next ? (
                    <li>
                        <Link
                            href={`/posts/page/${next}`}
                            className="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}
