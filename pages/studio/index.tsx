import type { Metadata } from "next";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio/metadata";
import config from "../../sanity.config";

export const metadata: Metadata = {
    ...studioMetadata,
    viewport: `${studioMetadata.viewport}, interactive-widget=resizes-content`,
};

export default function StudioPage() {
    return (
        <>
            <Head>
                {Object.entries(metadata).map(([key, value]) => (
                    <meta key={key} name={key} content={value} />
                ))}
            </Head>
            <NextStudio config={config} />
        </>
    );
}
