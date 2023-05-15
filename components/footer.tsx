import Link from "next/link";
import { buildClass, capitalize } from "libs/utils";
import { Email, Github, LinkedIn, Twitter } from "./icons";

interface Props {
    settings: Settings;
}

export default function Footer({ settings: { paths, iconLinks } }: Props) {
    const { email, github, linkedin, twitter } = iconLinks;

    const cls = buildClass(
        "fill-primary-black dark:fill-white",
        "transition-transform duration-200 ease-out hover:scale-125"
    );

    const icons = [
        { url: email, icon: <Email cls={cls} /> },
        { url: linkedin, icon: <LinkedIn cls={cls} /> },
        { url: twitter, icon: <Twitter cls={cls} /> },
        { url: github, icon: <Github cls={cls} /> },
    ];

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-700">
            <div className="mx-auto flex flex-col-reverse items-center justify-between p-8 md:flex-row">
                <ul className="font-base hidden px-3 text-base md:flex">
                    {paths.map((path, idx) => (
                        <li key={idx}>
                            <Link
                                className="block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                href={path}
                            >
                                {path === "/"
                                    ? "Home"
                                    : capitalize(path.slice(1))}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mt-2 flex gap-2 text-gray-500 dark:text-gray-400 md:mt-0">
                    <span>Ryan Kim</span>
                    <span> &bull; </span>
                    <span>&copy; 2023</span>
                </p>

                <ul className="flex flex-row items-center justify-start text-xs">
                    {icons.map(({ icon, url }, idx) => (
                        <li key={idx} className="p-3">
                            <Link href={url} target="_blank">
                                {icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
