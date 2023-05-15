import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "tag",
    title: "Tag",
    type: "document",
    icon: TagIcon,
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
    ],
    preview: {
        select: {
            title: "title",
        },
    },
});
