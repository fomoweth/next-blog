import { GetStaticProps } from "next";
import Link from "next/link";
import { fetchSettings, fetchTags } from "libs/sanity.queries";
import Layout from "components/layout";
import Tag from "components/tags";

interface Props {
    settings: Settings;
    tags: Tag[];
}

export default function Page({ settings, tags }: Props) {
    return (
        <Layout level={1} settings={settings} title="Tags">
            <div className="m-12 flex flex-col items-start justify-center md:m-20">
                <div className="mx-auto flex max-w-lg flex-wrap">
                    {tags.map(({ size, slug, title }, idx) => (
                        <div key={idx} className="mb-2 mr-5 mt-2">
                            <Link href={`/tags/${slug}`}>
                                <span className="text-teal-500 hover:underline">
                                    {title}
                                </span>
                                <span> ({size}) </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const [settings, tags = []] = await Promise.all([
        fetchSettings(),
        fetchTags(),
    ]);

    return {
        props: {
            settings,
            tags,
        },
    };
};
