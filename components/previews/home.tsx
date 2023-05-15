"use client";

import { usePreview } from "libs/sanity.preview";
import {
    authorQuery,
    postsQuery,
    projectsQuery,
    settingsQuery,
} from "libs/sanity.queries";
import View from "../pages/home";

interface Props {
    token: string | null;
}

export default function Preview({ token }: Props) {
    const author: Author = usePreview(token, authorQuery);
    const posts: Post[] = usePreview(token, postsQuery);
    const projects: Project[] = usePreview(token, projectsQuery);
    const settings: Settings = usePreview(token, settingsQuery);

    return (
        <View
            author={author}
            preview
            posts={posts}
            projects={projects}
            settings={settings}
        />
    );
}
