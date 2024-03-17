import Link from "next/link";
import { toPlainText } from "@portabletext/react";
import { duplicateObj, formatDates } from "libs/utils";
import Date from "./date";
import SvgIcon, { defineIconProps } from "./icon";

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

    const [
        locationIcon,
        emailIcon,
        blogIcon,
        githubIcon,
        linkedinIcon,
        twitterIcon,
    ] = defineIconProps(
        duplicateObj({ location: author.location, ...settings.iconLinks }, [
            "location",
            "email",
            "blog",
            "github",
            "linkedin",
            "twitter",
        ]),
        true
    );

    const icons = [
        blogIcon,
        githubIcon,
        linkedinIcon,
        twitterIcon,
        emailIcon,
    ].map((icon) => ({ ...icon, useText: false }));

    return (
        <div className="z-20 min-h-screen w-full">
            <div className="mx-auto my-5 border border-gray-400 p-10 dark:border-gray-700 md:my-20 md:max-h-full md:max-w-screen-md">
                <div className="flex flex-col md:px-10">
                    <header className="my-5 flex flex-col">
                        <div className="flex flex-col items-center text-center md:mb-0 md:flex-row md:items-stretch md:justify-between md:text-start">
                            <div className="flex flex-col md:justify-between">
                                <h1 className="m-2 text-3xl md:ml-0">
                                    {author.name}
                                </h1>

                                <h1 className="m-2 text-xl text-gray-700 dark:text-slate-300/90 md:ml-0 md:text-2xl">
                                    {author.position}
                                </h1>
                            </div>

                            <div className="flex flex-col items-center md:flex-col-reverse md:items-end md:justify-between">
                                <div className="m-3">
                                    <SvgIcon
                                        fill="fill-teal-500"
                                        {...locationIcon}
                                    />
                                </div>

                                <ul className="flex flex-row text-xs">
                                    {icons.map((icon, idx) => (
                                        <li key={idx} className="p-3">
                                            <Link
                                                href={icon.url!}
                                                target="_blank"
                                            >
                                                <SvgIcon {...icon} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>

                    <hr className="mb-7 w-full border-[#333]" />

                    <section className="md:text-start">
                        <div className="flex flex-col">
                            <h3 className="mb-3 text-center text-2xl font-semibold uppercase md:mb-0 md:text-start">
                                Professional Experience
                            </h3>

                            {author.experience.map(
                                (
                                    {
                                        company,
                                        description,
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
                                        className="my-3 flex flex-col"
                                    >
                                        <div className="mt-3 flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3">
                                                <h5 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
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

                                            <time className="text-sm font-light text-zinc-500">
                                                {formatDates(
                                                    startDate,
                                                    endDate
                                                )}
                                            </time>
                                        </div>

                                        <span className="m-2 text-center text-sm font-light text-gray-800 dark:text-gray-300/90 md:ml-1 md:text-start">
                                            {toPlainText(description)}
                                        </span>

                                        <h5 className="mt-1 text-center text-base font-medium text-zinc-900 dark:text-zinc-200 md:ml-0 md:text-start md:text-sm">
                                            {role}
                                        </h5>

                                        <ul className="ml-2 list-disc md:ml-1 md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="m-3 text-sm text-teal-500 md:ml-0"
                                                >
                                                    <span className="text-gray-700 dark:text-gray-400">
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

                    <section className="md:text-start">
                        <div className="flex flex-col">
                            {workProjects.map(
                                (
                                    {
                                        title,
                                        startDate,
                                        endDate,
                                        link,
                                        description,
                                        keyPoints,
                                    },
                                    idx
                                ) => (
                                    <div
                                        key={idx}
                                        className="mb-5 mt-2 flex flex-col"
                                    >
                                        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3">
                                                <h5 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
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

                                            {endDate ? (
                                                <time className="text-sm font-light text-zinc-500">
                                                    {formatDates(
                                                        startDate,
                                                        endDate
                                                    )}
                                                </time>
                                            ) : (
                                                <Date
                                                    date={startDate}
                                                    month="long"
                                                />
                                            )}
                                        </div>

                                        <p className="m-2 text-center text-sm font-light text-gray-800 dark:text-zinc-300/90 md:ml-1 md:text-start">
                                            {toPlainText(description)}
                                        </p>

                                        <ul className="list-disc md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="m-3 text-sm text-teal-500 md:ml-0"
                                                >
                                                    <span className="text-gray-700 dark:text-gray-400">
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

                    <hr className="mb-7 w-full border-[#333]" />

                    <section className="md:text-start">
                        <div className="flex flex-col">
                            <h3 className="mb-5 text-center text-2xl font-semibold uppercase md:text-start">
                                Technical Projects
                            </h3>

                            {personalProjects.map(
                                (
                                    {
                                        title,
                                        startDate,
                                        endDate,
                                        link,
                                        description,
                                        keyPoints,
                                    },
                                    idx
                                ) => (
                                    <div
                                        key={idx}
                                        className="mb-5 mt-2 flex flex-col"
                                    >
                                        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                                            <div className="flex flex-row items-center gap-3">
                                                <h5 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
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

                                            {endDate ? (
                                                <time className="text-sm font-light text-zinc-500">
                                                    {formatDates(
                                                        startDate,
                                                        endDate
                                                    )}
                                                </time>
                                            ) : (
                                                <Date
                                                    date={startDate}
                                                    month="long"
                                                />
                                            )}
                                        </div>

                                        <p className="m-2 text-center text-sm font-light text-gray-800 dark:text-zinc-300/90 md:ml-1 md:text-start">
                                            {toPlainText(description)}
                                        </p>

                                        <ul className="list-disc md:list-inside">
                                            {keyPoints.map((keyPoint, idx) => (
                                                <li
                                                    key={idx}
                                                    className="m-3 text-sm text-teal-500 md:ml-0"
                                                >
                                                    <span className="text-gray-700 dark:text-gray-400">
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

                    <hr className="mb-7 w-full border-[#333]" />

                    <section className="md:text-start">
                        <div className="mb-5 mt-2 flex flex-col">
                            <h3 className="mb-5 text-center text-2xl font-semibold uppercase md:text-start">
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
                                            <span className="hidden text-gray-900 dark:text-zinc-300/90 md:block">
                                                {skillType}:
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-400">
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

                    <hr className="mb-7 w-full border-[#333]" />
                </div>
            </div>
        </div>
    );
}
