import { GetStaticProps } from "next";
import { fetchPostsByTag, fetchSettings, fetchTags } from "libs/sanity.queries";
import { capitalize } from "libs/utils";
import View from "components/pages/posts";

interface Props {
    posts: Post[];
    settings: Settings;
    tag: string;
}

interface Query {
    [key: string]: string;
}

export default function Page({ posts, settings, tag }: Props) {
    return (
        <View
            posts={posts}
            settings={settings}
            title={`Tag: ${capitalize(tag.split("-").join(" "))}`}
        />
    );
}

export const getStaticProps: GetStaticProps<Props, Query> = async (ctx) => {
    const { params = {} } = ctx;

    const [settings, posts = []] = await Promise.all([
        fetchSettings(),
        fetchPostsByTag(params.slug),
    ]);

    return {
        props: {
            tag: params.slug,
            posts,
            settings,
        },
    };
};

export const getStaticPaths = async () => {
    const tags = await fetchTags();

    return {
        paths: tags.map(({ slug }) => `/tags/${slug}`) || [],
        fallback: "blocking",
    };
};
