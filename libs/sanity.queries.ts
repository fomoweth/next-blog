import { groq } from "next-sanity";
import { client } from "./sanity.client";

export const settingsQuery = groq`*[_type == "settings"][1] {
	metadata,
	description[],
	paths[],
	postsOffset,
	projectsOffset,
	experienceOffset,
	iconLinks
}`;

export const authorQuery = groq`*[_type == "author"][0] {
	location,
	experience[] | order(startDate, desc) {
		company,
		description[],
		role,
		link,
		startDate,
		endDate,
		keyPoints[]
	},
	skills[] {
		title,
		type
	}
}`;

const postFields = groq`
	title,
	"slug": slug.current,
	date,
	"tags": tags[] -> { title, "slug": slug.current},
	coverImage,
	description[],
	content[] {
		...,
		_type == "image" => {
			asset->
		}
	}
`;

export const indexQuery = groq`
	*[_type == "post" && !(_id in path("drafts.**")) && hidden == false] | order(date desc) {
		${postFields}
	}
`;

export const postsQuery = groq`
	{
		"posts": *[_type == "post" && !(_id in path("drafts.**")) && hidden == false] | order(_createdAt desc) [$start...$end] {
			${postFields},
		},
		"total": count(*[_type == "post" && !(_id in path("drafts.**")) && hidden == false])
	}
`;

export const projectsQuery = groq`
	*[_type == "project" && !(_id in path("drafts.**")) && hidden == false] | order(date desc) {
		title,
		"slug": slug.current,
		date,
		link,
		description[],
		keyPoints[],
		isPersonal
	}
`;

const postSlugsQuery = groq`
	*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && hidden == false][].slug.current
`;

export const postBySlugQuery = groq`
	*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**")) && hidden == false][0] {
		${postFields}
	}
`;

const postsByTagQuery = groq`
	*[_type == "tag" && slug.current == $tag][0] {
		"posts": *[_type == "post" && !(_id in path("drafts.**")) && hidden == false && references(^._id)] {
			${postFields}
		}
	}
`;

export const tagsQuery = groq`
	*[_type == "tag"] | order(slug.current asc) {
		title,
		"slug": slug.current,
		"size": count(*[_type == "post" && !(_id in path("drafts.**")) && hidden == false && references(^._id)])
	}
`;

export async function fetchSettings(): Promise<Settings> {
    const settings: Settings = (await client.fetch(settingsQuery)) || {};

    return settings;
}

export async function fetchAuthor(): Promise<Author> {
    const author: Author = (await client.fetch(authorQuery)) || {};

    return author;
}

export async function fetchPost(slug: string): Promise<Post> {
    const post: Post = (await client.fetch(postBySlugQuery, { slug })) || {};

    return post;
}

export async function fetchPosts(): Promise<Post[]> {
    const posts: Post[] = (await client.fetch(indexQuery)) || [];

    return posts;
}

export async function fetchPaginatedPosts(
    start: number,
    end: number
): Promise<{ posts: Post[]; total: number }> {
    const { posts, total }: { posts: Post[]; total: number } =
        (await client.fetch(postsQuery, { start, end })) || {};

    return { posts, total };
}

export async function fetchProjects(): Promise<Project[]> {
    const projects: Project[] = (await client.fetch(projectsQuery)) || [];

    return projects;
}

export async function fetchPostsByTag(tag: string): Promise<Post[]> {
    const { posts }: { posts: Post[] } = await client.fetch(postsByTagQuery, {
        tag,
    });

    return posts;
}

export async function fetchSlugs(): Promise<string[]> {
    const slugs: string[] = (await client.fetch(postSlugsQuery)) || [];

    return slugs;
}

export async function fetchTags(): Promise<Tag[]> {
    const tags: Tag[] = (await client.fetch(tagsQuery)) || [];

    return tags;
}
