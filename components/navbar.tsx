import Link from "next/link";
import { useState } from "react";
import { buildClass, capitalize } from "libs/utils";
import ThemeSwitch from "./theme-switch";

interface Props {
    paths: string[];
    level: 1 | 2;
    handleClick?: any;
}

export default function NavBar({ paths, level, handleClick }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    switch (level) {
        case 1:
            return (
                <header className="flex flex-col">
                    <div className="top-0 z-10 h-16 pt-6">
                        <div className="mx-auto w-full sm:px-8">
                            <nav className="flex-grid flex items-center">
                                <div className="flex w-full justify-end gap-5 md:justify-between">
                                    <div className="flex"></div>
                                    <div className="hidden md:flex md:gap-8">
                                        <ul className="hidden rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 md:flex">
                                            {paths.map((path, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        className="flex h-full items-center px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                        href={path}
                                                    >
                                                        {path === "/"
                                                            ? "Home"
                                                            : capitalize(
                                                                  path.slice(1)
                                                              )}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <ThemeSwitch />

                                    <div className="flex flex-col md:hidden">
                                        <button
                                            className="right-5 mt-1 flex items-center rounded-full bg-white/90 px-4 py-2 text-center text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                                            type="button"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            Menu{" "}
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        <div
                                            className={buildClass(
                                                "z-10 mt-1 divide-gray-200 rounded-lg bg-white/90 shadow dark:bg-zinc-800/90",
                                                !!toggle
                                                    ? "inline-block"
                                                    : "hidden"
                                            )}
                                        >
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                {paths.map((path, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            href={path}
                                                            className="block bg-white/90 px-4 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 hover:bg-gray-100 hover:text-teal-500 dark:bg-zinc-800/90 dark:hover:bg-zinc-800/5 dark:hover:text-teal-400"
                                                        >
                                                            {path === "/"
                                                                ? "Home"
                                                                : capitalize(
                                                                      path.slice(
                                                                          1
                                                                      )
                                                                  )}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            );

        case 2:
            return (
                <header className="flex flex-col">
                    <div className="top-0 z-10 h-16 pt-6">
                        <div className="mx-auto w-full sm:px-8">
                            <nav className="flex-grid flex">
                                <div className="flex w-full items-center justify-end gap-2">
                                    <ThemeSwitch />

                                    <button
                                        className="group rounded-full px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:text-teal-500 dark:bg-zinc-800/90"
                                        type="button"
                                        onClick={handleClick}
                                        aria-label="Toggle Dark Mode"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
                                        </svg>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            );

        default:
            throw new TypeError(`Invalid level: ${level}`);
    }
}
