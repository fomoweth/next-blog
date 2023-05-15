import { Search } from "./icons";

interface Props {
    type?: string;
    placeholder?: string;
    handleChange: any;
}

export default function SearchBar({
    type = "text",
    placeholder = "Search by Tag",
    handleChange,
}: Props) {
    return (
        <div className="relative mx-3 mb-10 max-w-xs md:ml-16">
            <input
                className="block w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 focus:ring-teal-500 dark:border-gray-900"
                type={type}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
            />

            <Search cls="absolute right-3 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
    );
}
