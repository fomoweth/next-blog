import { CodeBlockIcon, DocumentsIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField } from "sanity";

export default defineField({
    title: "Block Content",
    name: "blockContent",
    type: "array",
    icon: DocumentsIcon,
    of: [
        defineArrayMember({
            title: "Block",
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "H5", value: "h5" },
                { title: "Quote", value: "blockquote" },
            ],
            lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
            ],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Underline", value: "underline" },
                    { title: "Highlight", value: "highlight" },
                    { title: "Center", value: "center" },
                ],
                annotations: [
                    defineField({
                        name: "link",
                        title: "Link",
                        type: "object",
                        fields: [
                            {
                                name: "url",
                                title: "URL",
                                type: "url",
                                validation: (rule) => rule.required(),
                            },
                            {
                                name: "target",
                                title: "Target",
                                type: "string",
                                initialValue: "_blank",
                                validation: (rule) => rule.required(),
                            },
                        ],
                    }),
                ],
            },
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            icon: ImageIcon,
            fields: [
                defineField({
                    title: "Caption",
                    name: "caption",
                    type: "string",
                }),
                defineField({
                    name: "alt",
                    title: "Alternative text",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
            ],
            options: {
                hotspot: true,
            },
            preview: {
                select: {
                    source: "asset.url",
                    title: "caption",
                    alt: "alt",
                },
            },
        }),
        defineField({
            name: "code",
            title: "Code",
            type: "code",
            icon: CodeBlockIcon,
            options: {
                language: "solidity",
                languageAlternatives: [
                    { title: "Solidity", value: "solidity" },
                    { title: "Javascript", value: "javascript" },
                    { title: "Typescript", value: "typescript" },
                    { title: "Shell", value: "sh" },
                    { title: "Bash", value: "bash" },
                    { title: "JSON", value: "json" },
                    { title: "Text", value: "text" },
                ],
                withFilename: true,
            },
        }),
    ],
});
