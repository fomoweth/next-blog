import Head from "next/head";
import { toPlainText } from "@portabletext/react";
import Alert from "./alert";
import Date from "./date";
import Footer from "./footer";
import NavBar from "./navbar";

interface Props {
    children: React.ReactNode;
    handleClick?: any;
    level: 1 | 2;
    loading?: boolean;
    preview?: boolean;
    settings: Settings;
    title?: string;
    date?: string;
}

export default function Layout({
    children,
    handleClick,
    level = 1,
    loading,
    preview,
    settings,
    title,
    date,
}: Props) {
    return (
        <>
            <Head>
                <title>{settings.metadata.title}</title>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <meta charSet="utf-8" />
                <meta
                    key="description"
                    name="description"
                    content={toPlainText(settings.metadata.description)}
                />
            </Head>

            <div className="flex h-full flex-col">
                <Alert preview={preview} loading={loading} />

                <div className="container mx-auto flex h-screen max-w-5xl flex-col justify-between px-5 pb-10 md:pb-10">
                    <main>
                        <NavBar
                            paths={settings.paths}
                            level={level}
                            handleClick={handleClick}
                        />

                        {title ? (
                            <>
                                <div className="my-8 mb-6 md:mt-14">
                                    <div className="flex flex-col items-center justify-between text-center md:mx-10 md:flex-row">
                                        <h5 className="mb-3 text-center text-4xl font-semibold md:mb-0 md:text-start md:text-6xl">
                                            {title}
                                        </h5>

                                        {date ? (
                                            <Date
                                                date={date}
                                                month="long"
                                                day
                                                fontSize="base"
                                            />
                                        ) : null}
                                    </div>
                                </div>

                                <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                            </>
                        ) : null}

                        {children}
                    </main>

                    <Footer settings={settings} />
                </div>
            </div>
        </>
    );
}
