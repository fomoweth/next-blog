import { lazy } from "react";
import { GetStaticProps } from "next";
import { PreviewSuspense } from "@sanity/preview-kit";
import {
    fetchAuthor,
    fetchPosts,
    fetchProjects,
    fetchSettings,
} from "libs/sanity.queries";
import View from "components/pages/home";

const Preview = lazy(() => import("components/previews/home"));

interface Props {
    author: Author;
    posts: Post[];
    preview: boolean;
    projects: Project[];
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
    author,
    preview,
    posts,
    projects,
    settings,
    token,
}: Props) {
    if (preview) {
        return (
            <PreviewSuspense
                fallback={
                    <View
                        author={author}
                        loading
                        posts={posts}
                        preview
                        projects={projects}
                        settings={settings}
                    />
                }
            >
                <Preview token={token} />
            </PreviewSuspense>
        );
    }

    return (
        <View
            author={author}
            posts={posts}
            projects={projects}
            settings={settings}
        />
    );
}

export const getStaticProps: GetStaticProps<Props, Query, PreviewData> = async (
    ctx
) => {
    const { preview = false, previewData = {} } = ctx;

    const [settings, author, posts = [], projects = []] = await Promise.all([
        fetchSettings(),
        fetchAuthor(),
        fetchPosts(),
        fetchProjects(),
    ]);

    return {
        props: {
            author,
            posts,
            preview,
            projects,
            settings,
            token: previewData.token ?? null,
        },
    };
};
