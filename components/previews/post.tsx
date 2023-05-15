"use client";

import { usePreview } from "libs/sanity.preview";
import { postBySlugQuery, settingsQuery } from "libs/sanity.queries";
import View from "../pages/post";

interface Props {
    slug: string;
    token: string | null;
}

export default function Preview({ slug, token }: Props) {
    const post: Post = usePreview(token, postBySlugQuery, { slug });
    const settings: Settings = usePreview(token, settingsQuery);

    return <View preview post={post} settings={settings} />;
}
