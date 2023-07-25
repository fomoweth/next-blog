import Link from "next/link";
import { useState } from "react";
import { toPlainText } from "@portabletext/react";
import { buildClass } from "libs/utils";
import Button from "../button";
import Date from "../date";
import {
    ArrowDown,
    ArrowUp,
    CV,
    ExternalLink,
    Github,
    LinkedIn,
    Twitter,
} from "../icons";
import Layout from "../layout";
import Resume from "../resume";

interface Props {
    author: Author;
    loading?: boolean;
    posts: Post[];
    preview?: boolean;
    projects: Project[];
    settings: Settings;
}

export default function Home({
    author,
    loading,
    posts,
    preview,
    projects,
    settings,
}: Props) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);

    const { experience, location } = author;
    const { iconLinks } = settings;

    const { github, linkedin, twitter } = iconLinks;

    const cls = buildClass(
        "fill-primary-black dark:fill-white",
        "transition-transform duration-200 ease-out hover:scale-125"
    );

    const icons = [
        { icon: CV({ cls }) },
        { url: github, icon: Github({ cls }) },
        { url: linkedin, icon: LinkedIn({ cls }) },
        { url: twitter, icon: Twitter({ cls }) },
    ];

    return (
        <>
            {toggle ? (
                <Layout
                    level={2}
                    preview={preview}
                    settings={settings}
                    handleClick={() => setToggle(!toggle)}
                >
                    <Resume
                        author={author}
                        projects={projects}
                        settings={settings}
                    />
                </Layout>
            ) : (
                <Layout
                    level={1}
                    loading={loading}
                    preview={preview}
                    settings={settings}
                    title={settings.metadata.title}
                >
                    <section className="m-5 border-b border-zinc-200 pb-12 dark:border-zinc-700 md:border-none">
                        <div className="flex flex-col-reverse items-center md:mt-5 md:grid md:grid-cols-6">
                            <div className="mx-auto justify-self-start md:col-span-5">
                                <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-3 md:tracking-wide">
                                    <span className="text-3xl md:text-5xl">
                                        Ryan Kim
                                    </span>
                                    <span className="hidden md:block md:text-5xl">
                                        |
                                    </span>
                                    <span className="text-xl md:text-5xl">
                                        Smart Contract Engineer
                                    </span>
                                </div>

                                <p className="mt-3 font-light text-teal-500 md:mt-3 md:text-xl">
                                    {toPlainText(settings.description)}
                                </p>

                                <div className="mt-3">
                                    <ul className="flex flex-row items-center justify-start text-xs">
                                        {icons.map(({ icon, url }, idx) => (


                                            <li key={idx} className="p-3" style={idx == 0 ? {paddingLeft: "0 !important"} : {}}>
                                                {url ? (
                                                    <Link
                                                        href={url}
                                                        target="_blank"
                                                    >
                                                        {icon}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setToggle(!toggle)
                                                        }
                                                    >
                                                        {icon}
                                                    </button>
                                                )}
                                            </li>
                                        ))}

                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col md:grid md:grid-cols-2">
                        <div className="flex flex-col border-b border-zinc-200 dark:border-zinc-700 md:border-none">
                            <h3 className="m-5 text-center text-2xl font-normal md:pl-7 md:text-start md:text-3xl">
                                Latest Posts
                            </h3>

                            <div className="md:border-l md:border-zinc-200 md:pl-6 md:dark:border-zinc-700">
                                {posts
                                    .slice(0, settings.postsOffset)
                                    .map((post, idx) => (
                                        <article
                                            key={idx}
                                            className="m-8 block max-w-sm rounded-lg border border-gray-200 p-6 shadow transition duration-200 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-700"
                                        >
                                            <Link href={`/posts/${post.slug}`}>
                                                <Date
                                                    date={post.date}
                                                    month="short"
                                                    day
                                                />

                                                <h2 className="mb-2 mt-1 text-2xl font-bold tracking-tight">
                                                    {post.title}
                                                </h2>

                                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                    {toPlainText(
                                                        post.description
                                                    )}
                                                </p>

                                                <div
                                                    aria-hidden="true"
                                                    className="mt-4 flex items-center text-sm font-normal text-teal-500"
                                                >
                                                    Read More
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                            </div>

                            <div className="mx-auto mb-8">
                                <Link href="/posts">
                                    <Button text="More Posts" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="m-5 mb-0 text-center text-2xl font-normal md:pl-7 md:text-start md:text-3xl">
                                Projects
                            </h3>

                            <div className="m-10 mt-6 md:mt-14">
                                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                    {projects.map((project, idx) => (
                                        <li
                                            key={idx}
                                            className={buildClass(
                                                "mb-10 ml-6",
                                                !expanded &&
                                                    idx >=
                                                        settings.projectsOffset
                                                    ? "hidden"
                                                    : ""
                                            )}
                                        >
                                            <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>

                                            <Date
                                                date={project.date}
                                                month="long"
                                            />

                                            <div className="flex flex-row items-center gap-2">
                                                <h3 className="mb-1 text-xl font-semibold">
                                                    {project.title}
                                                </h3>

                                                {project.link ? (
                                                    <Link
                                                        className="mb-1"
                                                        href={project.link}
                                                        target="_blank"
                                                    >
                                                        <ExternalLink />
                                                    </Link>
                                                ) : null}
                                            </div>

                                            <p className="mb-4 text-base font-light text-gray-500 dark:text-gray-400">
                                                {toPlainText(
                                                    project.description
                                                )}
                                            </p>
                                        </li>
                                    ))}
                                </ol>

                                <div
                                    className={buildClass(
                                        "cursor-pointer justify-center",
                                        projects.length >=
                                            settings.projectsOffset
                                            ? "flex"
                                            : "hidden"
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        {expanded ? <ArrowUp /> : <ArrowDown />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            )}
        </>
    );
}
