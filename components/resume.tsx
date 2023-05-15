import Link from "next/link";
import { toPlainText } from "@portabletext/react";
import { buildClass, duplicateObj, formatDate, formatUrl } from "libs/utils";
import Date from "./date";
import SvgIcon, { defineProps } from "./icon";
import { CV, Email, Github, LinkedIn, Location, Twitter } from "./icons";

const formatDates = (startDate: string, endDate?: string): string => {
    return `${formatDate(startDate, "short")} - ${
        endDate ? formatDate(endDate, "short") : "Present"
    }`;
};

interface Props {
    author: Author;
    projects: Project[];
    settings: Settings;
}

const SKILL_TYPES = [
    "Programming Languages",
    "Web3",
    "Front-End",
    "Back-End",
    "Database",
    "Spoken Languages",
];

export default function Resume({ author, projects, settings }: Props) {
    const { workProjects, personalProjects } = projects.reduce<{
        workProjects: Project[];
        personalProjects: Project[];
    }>(
        (acc, project) => {
            if (!!project.isPersonal) {
                acc.personalProjects.push(project);
            } else {
                acc.workProjects.push(project);
            }

            return acc;
        },
        { workProjects: [], personalProjects: [] }
    );

    const [locationIcon, emailIcon, blogIcon] = defineProps(
        duplicateObj({ location: author.location, ...settings.iconLinks }, [
            "location",
            "email",
            "blog",
        ]),
        true
    );

    const [linkedinIcon, twitterIcon, githubIcon] = defineProps(
        duplicateObj(settings.iconLinks, ["linkedin", "twitter", "github"]),
        true
    );

    const icons = [
        emailIcon,
        blogIcon,
        linkedinIcon,
        twitterIcon,
        githubIcon,
    ].map((icon) => ({ ...icon, useText: false }));

    return (
        <div className="z-20 min-h-screen w-full">
            <div
                id="p1"
                className="container mx-auto my-5 border border-gray-200 p-10 dark:border-gray-700 md:my-20 md:max-h-[1064px] md:max-w-screen-md"
            >
                <div className="flex flex-col md:px-10">
                    <header className="my-5 flex flex-col">
                        <div className="flex flex-col text-center md:flex-row md:items-center md:gap-3">
                            <h1 className="mb-3 text-3xl md:mb-0">Ryan Kim</h1>
                            <h1 className="text-xl text-slate-400/90 md:text-2xl">
                                Smart Contract Engineer
                            </h1>
                        </div>
                        <div className="mx-10 flex flex-col font-light md:mx-0 md:flex-row">
                            <SvgIcon fill="fill-teal-500" {...locationIcon} />

                            <Link
                                className="hidden hover:text-teal-500 hover:underline dark:hover:text-teal-500/95 md:block"
                                href={emailIcon.url!}
                                target="_blank"
                            >
                                <SvgIcon {...emailIcon} />
                            </Link>
                        </div>
                        <div className="hidden font-light md:flex md:flex-row">
                            <Link
                                className="hidden hover:text-teal-500 hover:underline dark:hover:text-teal-500/95 md:block"
                                href={blogIcon.url!}
                                target="_blank"
                            >
                                <SvgIcon {...blogIcon} />
                            </Link>

                            <Link
                                className="hidden hover:text-teal-500 hover:underline dark:hover:text-teal-500/95 md:block"
                                href={linkedinIcon.url!}
                                target="_blank"
                            >
                                <SvgIcon {...linkedinIcon} />
                            </Link>

                            <Link
                                className="hidden hover:text-teal-500 hover:underline dark:hover:text-teal-500/95 md:block"
                                href={twitterIcon.url!}
                                target="_blank"
                            >
                                <SvgIcon {...twitterIcon} />
                            </Link>

                            <Link
                                className="hidden hover:text-teal-500 hover:underline dark:hover:text-teal-500/95 md:block"
                                href={githubIcon.url!}
                                target="_blank"
                            >
                                <SvgIcon {...githubIcon} />
                            </Link>
                        </div>
                        <ul className="flex flex-row items-center justify-start text-xs md:hidden">
                            {icons.map((icon, idx) => (
                                <li key={idx} className="p-3">
                                    <Link href={icon.url!} target="_blank">
                                        <SvgIcon {...icon} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </header>

                    <hr className="mb-2 mt-1 w-full border-[#333]" />

                    <section className="mt-2 md:text-start">
                        <div className="flex flex-col">
                            <h3 className="border-b border-[#333] pb-5 text-center text-xl font-semibold uppercase md:text-start">
                                Professional Experience
                            </h3>

                            {author.experience.map(
                                (
                                    {
                                        company,
                                        role,
                                        link,
                                        startDate,
                                        endDate,
                                        keyPoints,
                                    },
                                    idx
                                ) => (
                                    <div
                                        key={idx}
                                        className="my-4 flex flex-col"
                                    >
                                        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3">
                                                <h5 className="text-lg font-medium uppercase">
                                                    {company}
                                                </h5>
                                                {link ? (
                                                    <Link
                                                        className="pb-1"
                                                        href={link}
                                                        target="_blank"
                                                    >
                                                        <svg
                                                            className="text-teal-500 hover:text-zinc-400 dark:hover:text-gray-300"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                                                        </svg>
                                                    </Link>
                                                ) : null}
                                            </div>
                                            <time className="text-sm font-light text-zinc-600 dark:text-zinc-400">
                                                {formatDates(
                                                    startDate,
                                                    endDate
                                                )}
                                            </time>
                                        </div>
                                        <h5 className="my-1 text-center text-xs font-normal uppercase text-zinc-600 dark:text-zinc-400 md:ml-1 md:text-start md:text-sm">
                                            {role}
                                        </h5>

                                        <ul className="list-disc md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="mt-1 text-sm text-teal-500"
                                                >
                                                    <span className="text-gray-500 dark:text-gray-300">
                                                        {keyPoint}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </section>

                    <section className="mt-1 md:text-start">
                        <div className="flex flex-col">
                            {workProjects.map(
                                (
                                    {
                                        title,
                                        date,
                                        link,
                                        description,
                                        keyPoints,
                                    },
                                    idx
                                ) => (
                                    <div
                                        key={idx}
                                        className="mb-4 flex flex-col"
                                    >
                                        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3 text-center">
                                                <h5 className="text-lg font-medium uppercase">
                                                    {title}
                                                </h5>
                                                {link ? (
                                                    <Link
                                                        className="pb-1"
                                                        href={link}
                                                        target="_blank"
                                                    >
                                                        <svg
                                                            className="text-teal-500 hover:text-zinc-400 dark:hover:text-gray-300"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                                                        </svg>
                                                    </Link>
                                                ) : null}
                                            </div>

                                            <Date date={date} month="short" />
                                        </div>

                                        <p className="my-2 ml-1 text-sm font-light text-gray-500 dark:text-gray-400">
                                            {toPlainText(description)}
                                        </p>

                                        <ul className="list-disc md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="mt-1 text-sm text-teal-500"
                                                >
                                                    <span className="text-gray-500 dark:text-gray-300">
                                                        {keyPoint}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <div
                id="p2"
                className="container mx-auto my-5 border border-gray-200 px-10 pb-10 dark:border-gray-700 md:my-20 md:max-h-[1064px] md:max-w-screen-md"
            >
                <div className="flex flex-col px-5">
                    <header className="my-5 flex flex-col items-center"></header>

                    <hr className="mb-2 mt-1 w-full border-[#333]" />

                    <section className="mt-2 md:text-start">
                        <div className="flex flex-col">
                            <h3 className="mb-4 border-b border-[#333] pb-5 text-center text-xl font-semibold uppercase md:text-start">
                                Technical Projects
                            </h3>

                            {personalProjects.map(
                                (
                                    {
                                        title,
                                        date,
                                        link,
                                        description,
                                        keyPoints,
                                    },
                                    idx
                                ) => (
                                    <div
                                        key={idx}
                                        className="mb-4 flex flex-col"
                                    >
                                        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3">
                                                <h5 className="text-lg font-medium uppercase">
                                                    {title}
                                                </h5>
                                                {link ? (
                                                    <Link
                                                        className="pb-1"
                                                        href={link}
                                                        target="_blank"
                                                    >
                                                        <svg
                                                            className="text-teal-500 hover:text-zinc-400 dark:hover:text-gray-300"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                                                        </svg>
                                                    </Link>
                                                ) : null}
                                            </div>
                                            <Date date={date} month="short" />
                                        </div>

                                        <p className="my-2 ml-1 text-sm font-light text-gray-500 dark:text-gray-400">
                                            {toPlainText(description)}
                                        </p>

                                        <ul className="list-disc md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="mt-1 text-sm text-teal-500"
                                                >
                                                    <span className="text-gray-500 dark:text-gray-300">
                                                        {keyPoint}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </section>

                    <hr className="mb-2 mt-5 w-full border-[#333]" />

                    <section className="mt-2">
                        <div className="flex flex-col text-center text-sm">
                            <h3 className="mb-4 border-b border-[#333] pb-5 text-center text-xl font-semibold uppercase md:text-start">
                                Key Skills
                            </h3>

                            <div className="mx-auto flex flex-col md:mx-0">
                                {SKILL_TYPES.map((skillType, idx) => (
                                    <div
                                        key={idx}
                                        className="mb-4 flex flex-row items-start gap-2 md:items-center"
                                    >
                                        <span className="flex flex-row gap-2">
                                            <span className="text-teal-500">{`>>`}</span>
                                            <span className="hidden md:block">
                                                {skillType}:
                                            </span>
                                            <span>
                                                {author.skills
                                                    .filter(
                                                        ({ type }) =>
                                                            type === skillType
                                                    )
                                                    .map(({ title }) => title)
                                                    .join(", ")}
                                            </span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
