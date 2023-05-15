import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { formatDate } from "libs/utils";

export default defineType({
    name: "post",
    title: "Post",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: (value, context) =>
                    context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                defineArrayMember({
                    name: "tag",
                    type: "reference",
                    to: { type: "tag" },
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            fields: [
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
                    alt: "alt",
                },
            },
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "description",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "blockContent",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "hidden",
            title: "Hidden",
            type: "boolean",
            initialValue: false,
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            tags: "tags",
            date: "date",
        },
        prepare(selection) {
            const { title, tags, date } = selection;
            return {
                title,
                subtitle: formatDate(date, "short", true),
            };
        },
    },
});
