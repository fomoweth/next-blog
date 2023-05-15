import { lazy } from "react";
import { GetStaticProps } from "next";
import { PreviewSuspense } from "@sanity/preview-kit";
import { fetchProjects, fetchSettings } from "libs/sanity.queries";
import View from "components/pages/projects";

const Preview = lazy(() => import("components/previews/posts"));

interface Props {
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

export default function Page({ preview, projects, settings, token }: Props) {
    if (preview) {
        return (
            <PreviewSuspense
                fallback={
                    <View
                        loading
                        projects={projects}
                        preview
                        settings={settings}
                    />
                }
            >
                <Preview token={token} />
            </PreviewSuspense>
        );
    }

    return <View projects={projects} settings={settings} />;
}

export const getStaticProps: GetStaticProps<Props, Query, PreviewData> = async (
    ctx
) => {
    const { preview = false, previewData = {} } = ctx;

    const [settings, projects = []] = await Promise.all([
        fetchSettings(),
        fetchProjects(),
    ]);

    return {
        props: {
            preview,
            projects,
            settings,
            token: previewData.token ?? null,
        },
    };
};
