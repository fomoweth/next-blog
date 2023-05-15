import Link from "next/link";
import Loading from "./loading";

interface Props {
    loading?: boolean;
    preview?: boolean;
}

export default function Alert({ loading, preview }: Props) {
    if (!preview) return null;

    return (
        <div className="border-b border-[#333] bg-[#333] p-4 text-white">
            <div className="py-2 text-center text-sm">
                {loading ? (
                    <Loading />
                ) : (
                    <Link href="/api/exit-preview">
                        <span className="text-teal-500 underline transition-colors duration-200 hover:text-teal-600">
                            Exit Preview
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
}
