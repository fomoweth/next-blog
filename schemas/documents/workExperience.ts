import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "workExperience",
    title: "Work Experience",
    type: "document",
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
            name: "role",
            title: "Role",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "bulletPoints",
            title: "Bullet Points",
            type: "array",
            of: [
                defineArrayMember({
                    type: "string",
                }),
            ],
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
    ],
});
