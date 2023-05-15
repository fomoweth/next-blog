import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { formatDate } from "libs/utils";

export default defineType({
    name: "project",
    title: "Project",
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
            type: "date",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "url",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "description",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "keyPoints",
            title: "Key Points",
            type: "array",
            of: [
                defineArrayMember({
                    type: "string",
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "isPersonal",
            title: "Is Personal Project",
            type: "boolean",
            initialValue: false,
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
            date: "date",
        },
        prepare(selection) {
            const { title, date } = selection;
            return {
                title,
                subtitle: formatDate(date, "short", true),
            };
        },
    },
});
