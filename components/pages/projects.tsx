import Link from "next/link";
import { toPlainText } from "@portabletext/react";
import Date from "../date";
import { ExternalLink } from "../icons";
import Layout from "../layout";

interface Props {
    loading?: boolean;
    preview?: boolean;
    projects: Project[];
    settings: Settings;
}

export default function Projects({
    loading,
    projects,
    preview,
    settings,
}: Props) {
    return (
        <Layout
            level={1}
            loading={loading}
            preview={preview}
            settings={settings}
            title="Projects"
        >
            <section className="m-5">
                <div className="flex pb-10 md:mx-28">
                    <ol className="relative mx-16 mt-5 border-l border-gray-200 dark:border-gray-700">
                        {projects.map(
                            ({ date, description, link, title }, idx) => (
                                <li key={idx} className="mb-10 ml-16">
                                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>

                                    <Date date={date} month="long" />

                                    <Link
                                        className="flex flex-row items-center gap-3"
                                        href={link}
                                        target="_blank"
                                    >
                                        <h3 className="text-3xl font-semibold leading-relaxed">
                                            {title}
                                        </h3>

                                        <ExternalLink />
                                    </Link>

                                    <p className="mb-4 text-base font-light text-gray-500 dark:text-gray-400">
                                        {toPlainText(description)}
                                    </p>
                                </li>
                            )
                        )}
                    </ol>
                </div>
            </section>
        </Layout>
    );
}
