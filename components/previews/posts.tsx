"use client";

import { usePreview } from "libs/sanity.preview";
import { indexQuery, settingsQuery } from "libs/sanity.queries";
import View from "../pages/posts";

interface Props {
    token: string | null;
}

export default function Preview({ token }: Props) {
    const posts: Post[] = usePreview(token, indexQuery);
    const settings: Settings = usePreview(token, settingsQuery);

    return <View posts={posts} preview settings={settings} title="Posts" />;
}
