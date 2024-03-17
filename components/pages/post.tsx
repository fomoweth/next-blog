import Link from "next/link";
import CoverImage from "../cover-image";
import Layout from "../layout";
import PostContent from "../post-content";
import { ArrowLeft, ArrowRight } from "../icons";
import Tags from "../tags";

interface Props {
    loading?: boolean;
    post: Post;
    prev?: Post;
    next?: Post;
    preview?: boolean;
    settings: Settings;
}

export default function Post({
    loading,
    post,
    prev,
    next,
    preview,
    settings,
}: Props) {
    return (
        <Layout
            level={1}
            loading={loading}
            preview={preview}
            settings={settings}
            title={post.title}
            date={post.date}
        >
            <article className="m-5">
                <div className="flex flex-col">
                    <div className="mt-3 flex flex-col items-center gap-6 md:ml-6 md:flex-row md:flex-wrap">
                        <Tags tags={post.tags} />
                    </div>

                    <div className="flex flex-col items-center">
                        {post.coverImage ? (
                            <CoverImage
                                source={post.coverImage}
                                title={post.title}
                            />
                        ) : null}

                        <PostContent post={post} />

                        <div className="my-6 flex w-full flex-col p-5">
                            <nav className="mx-10 flex flex-row items-center justify-between">
                                <div className="mx-5 my-1 flex flex-col">
                                    {prev ? (
                                        <Link
                                            href={`/posts/${prev.slug}`}
                                            className="flex flex-row gap-5 text-teal-500 transition-colors hover:text-zinc-600 dark:hover:text-gray-300"
                                        >
                                            <ArrowLeft />

                                            <span className="hidden md:block">
                                                {prev.title}
                                            </span>
                                        </Link>
                                    ) : null}
                                </div>

                                <div className="mx-5 my-1">
                                    {next ? (
                                        <Link
                                            href={`/posts/${next.slug}`}
                                            className="flex flex-row gap-5 text-teal-500 transition-colors hover:text-zinc-600 dark:hover:text-gray-300"
                                        >
                                            <span className="hidden md:block">
                                                {next.title}
                                            </span>

                                            <ArrowRight />
                                        </Link>
                                    ) : null}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
