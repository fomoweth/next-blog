import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { fetchAuthor, fetchProjects, fetchSettings } from "libs/sanity.queries";
import { buildClass, formatDate } from "libs/utils";
import Button from "components/button";
import { Email, Github, LinkedIn, Twitter } from "components/icons";
import Layout from "components/layout";
import Resume from "components/resume";

interface Props {
    author: Author;
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

const getYears = (date: string): number => {
    return new Date().getFullYear() - new Date(date).getFullYear();
};

const isUrl = (value: string | undefined): boolean => {
    if (!value) return false;

    return /^\/\/|^.*?:(\/\/)?/.test(value);
};

export default function Page({ author, preview, projects, settings }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    const {
        iconLinks: { email, github, linkedin, twitter },
    } = settings;

    const cls = buildClass("fill-primary-black dark:fill-white");

    const icons = [
        { name: "email", text: "Email", url: email, icon: <Email cls={cls} /> },
        {
            name: "linkedin",
            text: "LinkedIn",
            url: linkedin,
            icon: <LinkedIn cls={cls} />,
        },
        {
            name: "twitter",
            text: "Twitter",
            url: twitter,
            icon: <Twitter cls={cls} />,
        },
        {
            name: "github",
            text: "Github",
            url: github,
            icon: <Github cls={cls} />,
        },
    ].map(({ name, icon, text, url }, idx) => {
        const children = (
            <>
                {icon}
                <span className="text-base">{text}</span>
            </>
        );

        if (!!url && !!isUrl(url)) {
            return (
                <Link
                    key={idx}
                    className="m-4 flex flex-row items-center gap-3 hover:underline"
                    href={url}
                    target="_blank"
                >
                    {icon}
                    <span className="text-base">{text}</span>
                </Link>
            );
        } else if (name === "cv") {
            return (
                <button
                    key={idx}
                    className="m-4 flex flex-row items-center gap-3 hover:underline"
                    type="button"
                    onClick={() => setToggle(!toggle)}
                >
                    {children}
                </button>
            );
        } else {
            return (
                <div key={idx} className="m-4 flex flex-row items-center gap-3">
                    {children}
                </div>
            );
        }
    });

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
                    preview={preview}
                    settings={settings}
                    title="About"
                >
                    <section className="m-5">
                        <div className="flex flex-col items-center md:grid md:grid-cols-4">
                            <div className="mt-5 md:col-span-3 md:mt-0 md:flex md:flex-col">
                                <span className="text-3xl md:text-5xl">
                                    Ryan Kim
                                </span>

                                <p className="my-5 pr-0 text-lg text-gray-500 dark:text-gray-400 md:pr-8">
                                    Smart contract engineer with{" "}
                                    {getYears("2021-06-01")} years of
                                    professional experience in designing and
                                    developing DeFi applications and other
                                    Blockchain-related projects. Proficient in
                                    developing EVM based smart contracts;
                                    well-versed in programming languages such as
                                    Solidity and Typescript.
                                </p>

                                <div className="mx-16 my-8 md:my-3 md:ml-0 md:mr-auto">
                                    <Button
                                        text="View Resume"
                                        onClick={() => setToggle(!toggle)}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full flex-col md:col-span-1 md:mt-8 md:pt-5">
                                {icons}
                            </div>
                        </div>
                    </section>
                </Layout>
            )}
        </>
    );
}

export const getStaticProps: GetStaticProps<Props, Query, PreviewData> = async (
    ctx
) => {
    const { preview = false, previewData = {} } = ctx;

    const [settings, author, projects = []] = await Promise.all([
        fetchSettings(),
        fetchAuthor(),
        fetchProjects(),
    ]);

    return {
        props: {
            author,
            preview,
            projects,
            settings,
            token: previewData.token ?? null,
        },
    };
};
