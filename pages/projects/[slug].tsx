import { GetStaticProps } from "next";
import { notFound } from "next/navigation";
import { lazy } from "react";
import { PreviewSuspense } from "@sanity/preview-kit";
import { fetchPosts, fetchSettings, fetchSlugs } from "libs/sanity.queries";
import View from "components/pages/post";

const Preview = lazy(() => import("components/previews/post"));

interface Props {
    post: Post;
    prev?: Post;
    next?: Post;
    preview?: boolean;
    settings: Settings;
    token: string | null;
}

interface Query {
    [key: string]: string;
}

interface PreviewData {
    token?: string;
}

export default function Page({
    post,
    prev,
    next,
    preview,
    settings,
    token,
}: Props) {
    if (preview) {
        return (
            <>
                <PreviewSuspense
                    fallback={
                        <View
                            loading
                            post={post}
                            prev={prev}
                            next={next}
                            settings={settings}
                        />
                    }
                >
                    <Preview slug={post.slug} token={token} />
                </PreviewSuspense>
            </>
        );
    }

    return <View post={post} prev={prev} next={next} settings={settings} />;
}

export const getStaticProps: GetStaticProps<Props, Query, PreviewData> = async (
    ctx
) => {
    const { preview = false, previewData = {}, params = {} } = ctx;

    const [settings, posts = []] = await Promise.all([
        fetchSettings(),
        fetchPosts(),
    ]);

    const postIndex = posts.findIndex((post) => post.slug === params.slug);
    const prev = posts[postIndex - 1] || null;
    const next = posts[postIndex + 1] || null;
    const post = posts[postIndex];

    if (!post) {
        notFound();
    }

    return {
        props: {
            post,
            prev,
            next,
            preview,
            settings,
            token: previewData.token ?? null,
        },
    };
};

export const getStaticPaths = async () => {
    const slugs = await fetchSlugs();

    return {
        paths: slugs?.map((slug) => `/projects/${slug}`) || [],
        fallback: "blocking",
    };
};
