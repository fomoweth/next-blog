"use client";

import { usePreview } from "libs/sanity.preview";
import { postsQuery, settingsQuery } from "libs/sanity.queries";
import View from "../pages/projects";

interface Props {
    token: string | null;
}

export default function Preview({ token }: Props) {
    const projects: Project[] = usePreview(token, postsQuery);
    const settings: Settings = usePreview(token, settingsQuery);

    return <View preview projects={projects} settings={settings} />;
}
