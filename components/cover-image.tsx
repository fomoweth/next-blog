import Image from "next/image";
import urlFor from "@libs/sanity.image";

interface Props {
    source: any;
    title: string;
}

export default function CoverImage({ source, title }: Props) {
    return (
        <div className="m-5 p-5 sm:mx-0">
            <Image
                className="h-auto w-full"
                width={2000}
                height={1000}
                src={urlFor(source).url()}
                alt={`Cover image for ${title}`}
            />
        </div>
    );
}
