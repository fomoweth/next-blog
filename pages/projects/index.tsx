import { GetStaticProps } from "next";
import { fetchProjects, fetchSettings } from "libs/sanity.queries";
import View from "components/pages/projects";

interface Props {
    projects: Project[];
    settings: Settings;
}

interface Query {
    [key: string]: string;
}

export default function Page({ projects, settings }: Props) {
    return <View projects={projects} settings={settings} />;
}

export const getStaticProps: GetStaticProps<Props, Query> = async () => {
    const [settings, projects = []] = await Promise.all([
        fetchSettings(),
        fetchProjects(),
    ]);

    return {
        props: {
            projects,
            settings,
        },
    };
};
