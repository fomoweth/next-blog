import { lazy } from "react";
import { GetStaticProps } from "next";
import { PreviewSuspense } from "@sanity/preview-kit";
import { fetchPosts, fetchSettings } from "libs/sanity.queries";
import View from "components/pages/posts";

const Preview = lazy(() => import("components/previews/posts"));

interface Props {
    posts: Post[];
    preview: boolean;
    settings: Settings;
    token: string | null;
}

interface Query {
    [key: string]: string;
}

interface PreviewData {
    token?: string;
}

export default function Page({ preview, posts, settings, token }: Props) {
    if (preview) {
        return (
            <PreviewSuspense
                fallback={
                    <View
                        loading
                        preview
                        posts={posts}
                        settings={settings}
                        title="Posts"
                    />
                }
            >
                <Preview token={token} />
            </PreviewSuspense>
        );
    }

    return <View posts={posts} settings={settings} title="Posts" />;
}

export const getStaticProps: GetStaticProps<Props, Query, PreviewData> = async (
    ctx
) => {
    const { preview = false, previewData = {} } = ctx;

    const [settings, posts = []] = await Promise.all([
        fetchSettings(),
        fetchPosts(),
    ]);

    return {
        props: {
            posts,
            preview,
            settings,
            token: previewData.token ?? null,
        },
    };
};
