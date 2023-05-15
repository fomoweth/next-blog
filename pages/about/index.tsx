import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { toPlainText } from "@portabletext/react";
import { fetchAuthor, fetchProjects, fetchSettings } from "libs/sanity.queries";
import { buildClass, duplicateObj, formatDate, formatUrl } from "libs/utils";
import Button from "components/button";
import {
    ArrowDown,
    ArrowUp,
    CV,
    Email,
    ExternalLink,
    Github,
    LinkedIn,
    Location,
    Twitter,
    Web,
} from "components/icons";
import Layout from "components/layout";
import Resume from "components/resume";
import SvgIcon, { defineProps } from "components/icon";

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

const formatDates = (startDate: string, endDate?: string): string => {
    return `${formatDate(startDate, "short")} - ${
        endDate ? formatDate(endDate, "short") : "Present"
    }`;
};

const getYears = (date: string): number => {
    return new Date().getFullYear() - new Date(date).getFullYear();
};

const isUrl = (value: string | undefined): boolean => {
    if (!value) return false;

    return /^\/\/|^.*?:(\/\/)?/.test(value);
};

export default function Page({ author, preview, projects, settings }: Props) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);

    const { experience, location } = author;
    const {
        iconLinks: { blog, email, github, linkedin, twitter },
    } = settings;

    const cls = buildClass(
        "fill-primary-black dark:fill-white"
        // "transition-transform duration-200 ease-out hover:scale-125"
    );

    const icons = [
        {
            name: "location",
            text: location,
            icon: <Location cls={cls} />,
        },
        { name: "cv", text: "Resume", icon: <CV cls={cls} /> },
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
                    {children}
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

                    <div className="mb-12 flex flex-col">
                        <h3 className="m-5 mb-0 text-2xl font-normal md:text-start md:text-3xl">
                            Professional Experience
                        </h3>

                        <hr className="my-6 border-zinc-200 dark:border-zinc-700" />

                        <div className="m-10 mt-6 flex">
                            <div className="flex flex-col items-center">
                                <ol className="relative border-l border-gray-200 py-4 dark:border-gray-700">
                                    {experience.map(
                                        (
                                            {
                                                company,
                                                role,
                                                description,
                                                link,
                                                startDate,
                                                endDate,
                                            },
                                            idx
                                        ) => (
                                            <li
                                                key={idx}
                                                className={buildClass(
                                                    "mb-10 ml-10 md:ml-20",
                                                    !expanded &&
                                                        idx >=
                                                            settings.experienceOffset
                                                        ? "hidden"
                                                        : ""
                                                )}
                                            >
                                                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>

                                                <time className="mb-1 text-sm font-light leading-none text-zinc-600 dark:text-zinc-400">
                                                    {formatDates(
                                                        startDate,
                                                        endDate
                                                    )}
                                                </time>

                                                {role ? (
                                                    <p className="font-base mb-1 text-base text-gray-500 dark:text-gray-400">
                                                        {role}
                                                    </p>
                                                ) : null}

                                                <div className="mb-1 flex flex-row items-center gap-3">
                                                    <h3 className="text-xl font-semibold">
                                                        {company}
                                                    </h3>

                                                    {link ? (
                                                        <Link
                                                            href={link}
                                                            target="_blank"
                                                        >
                                                            <ExternalLink />
                                                        </Link>
                                                    ) : null}
                                                </div>

                                                {description ? (
                                                    <p className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                                                        {toPlainText(
                                                            description
                                                        )}
                                                    </p>
                                                ) : null}
                                            </li>
                                        )
                                    )}
                                </ol>
                                <div
                                    className={buildClass(
                                        "cursor-pointer justify-center",
                                        experience.length >=
                                            settings.experienceOffset
                                            ? "block"
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
                    </div>
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
