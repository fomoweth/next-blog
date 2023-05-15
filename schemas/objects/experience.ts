import { defineArrayMember, defineField } from "sanity";

export default defineField({
    name: "experience",
    title: "Professional Experience",
    type: "object",
    fields: [
        defineField({
            name: "company",
            title: "Company",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "company",
                maxLength: 96,
                isUnique: (value, context) =>
                    context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "description",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            initialValue: "Smart Contract Engineer",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "url",
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
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
        }),
    ],
});
