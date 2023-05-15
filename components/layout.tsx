import Head from "next/head";
import { toPlainText } from "@portabletext/react";
import Alert from "./alert";
import Footer from "./footer";
import NavBar from "./navbar";
import Separator from "./separator";

interface Props {
    children: React.ReactNode;
    handleClick?: any;
    level: 1 | 2;
    loading?: boolean;
    preview?: boolean;
    settings: Settings;
    title?: string;
}

export default function Layout({
    children,
    handleClick,
    level = 1,
    loading,
    preview,
    settings,
    title,
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
                                    <h1 className="text-center text-4xl font-semibold md:ml-10 md:text-start md:text-6xl">
                                        {title}
                                    </h1>
                                </div>

                                <Separator />
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
