import Link from "next/link";
import { useState } from "react";
import { toPlainText } from "@portabletext/react";
import Date from "../date";
import Layout from "../layout";
import SearchBar from "../search-bar";
import Tags from "../tags";

interface Props {
    loading?: boolean;
    posts: Post[];
    preview?: boolean;
    settings: Settings;
    title: string;
}

export default function Posts({
    loading,
    posts: initialPosts,
    preview,
    settings,
    title,
}: Props) {
    const [search, setSearch] = useState<string>("");

    const posts = initialPosts.filter((post) =>
        post.tags
            ?.map(({ title }) => title)
            .concat(post.title)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Layout
            level={1}
            loading={loading}
            preview={preview}
            settings={settings}
            title={title}
        >
            <section className="mb-20 mt-10">
                <SearchBar handleChange={setSearch} />

                {posts.map(({ date, description, slug, tags, title }, idx) => (
                    <div
                        key={idx}
                        className="my-5 flex flex-col text-center md:grid md:grid-cols-4 md:text-start"
                    >
                        <div className="col-span-1 mx-auto mt-2 text-center">
                            <Date date={date} month="long" day />
                        </div>

                        <div className="col-span-3">
                            <Link href={`/posts/${slug}`}>
                                <h2 className="mb-2 mt-1 text-2xl font-bold tracking-tight hover:underline">
                                    {title}
                                </h2>
                            </Link>

                            <p className="mx-5 my-2 line-clamp-2 text-sm font-light text-gray-500 dark:text-gray-400 md:mx-0">
                                {toPlainText(description)}
                            </p>

                            <div className="my-1 flex w-full justify-center md:justify-start">
                                <Tags
                                    cls="flex flex-wrap items-center gap-3 text-center"
                                    tags={tags}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </Layout>
    );
}
