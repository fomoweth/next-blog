import Link from "next/link";
import { formatTag } from "libs/utils";

interface Props {
    tags: Tag[];
    cls?: string;
}

export default function Tags({ cls = "flex flex-row gap-4", tags }: Props) {
    return (
        <div className={cls}>
            {tags.map((tag, idx) => (
                <Link
                    key={idx}
                    className="text-teal-500 hover:underline"
                    href={`/tags/${tag.slug}`}
                >
                    {formatTag(tag.title)}
                </Link>
            ))}
        </div>
    );
}
