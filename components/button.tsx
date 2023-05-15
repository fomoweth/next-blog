interface Props {
    text: string;
    [key: string]: any;
}

export default function Button({ text, ...rest }: Props) {
    return (
        <button
            type="button"
            className="w-full rounded-md border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:bg-gray-100 hover:text-teal-500 focus:outline-none dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:bg-zinc-800/5 dark:hover:text-teal-400 dark:focus:ring-teal-400"
            {...rest}
        >
            {text}
        </button>
    );
}
