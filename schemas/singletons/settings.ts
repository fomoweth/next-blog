import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "settings",
    title: "Settings",
    type: "document",
    icon: CogIcon,
    fields: [
        defineField({
            name: "metadata",
            title: "Metadata",
            type: "metadata",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [
                defineArrayMember({
                    type: "block",
                    options: {},
                    styles: [],
                    lists: [],
                    marks: {
                        decorators: [],
                        annotations: [
                            defineField({
                                name: "link",
                                type: "object",
                                fields: [
                                    {
                                        name: "url",
                                        title: "URL",
                                        type: "string",
                                        validation: (rule) => rule.required(),
                                    },
                                ],
                            }),
                        ],
                    },
                }),
            ],
            validation: (rule) => rule.max(155).required(),
        }),
        defineField({
            name: "paths",
            title: "Paths",
            type: "array",
            of: [
                defineArrayMember({
                    name: "path",
                    title: "Path",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
            ],
            initialValue: ["/", "about", "posts", "projects", "tags"],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "postsOffset",
            title: "Posts Offset",
            type: "number",
            initialValue: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "projectsOffset",
            title: "Projects Offset",
            type: "number",
            initialValue: 5,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "experienceOffset",
            title: "Experience Offset",
            type: "number",
            initialValue: 5,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "iconLinks",
            title: "Icon Links",
            type: "object",
            fields: [
                defineField({
                    name: "email",
                    title: "Email",
                    type: "string",
                    initialValue: "mailto:rykim0100@gmail.com",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "blog",
                    title: "Blog",
                    type: "url",
                    initialValue: "http://rkim.xyz",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "linkedin",
                    title: "LinkedIn",
                    type: "url",
                    initialValue: "https://www.linkedin.com/in/ryankimmm",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "twitter",
                    title: "Twitter",
                    type: "url",
                    initialValue: "https://twitter.com/neocortex404",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "github",
                    title: "Github",
                    type: "url",
                    initialValue: "https://github.com/neocortex404",
                    validation: (rule) => rule.required(),
                }),
            ],
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "metadata.title",
            description: "metadata.description",
        },
    },
});
