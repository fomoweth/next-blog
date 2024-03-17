import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "avatar",
            title: "Avatar",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            initialValue: "Ryan Kim",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "position",
            title: "Position",
            type: "string",
            initialValue: "Smart Contract Engineer",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
                isUnique: (value, context) =>
                    context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            initialValue: "Pomona, CA",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "skills",
            title: "Key Skills",
            type: "array",
            of: [
                defineArrayMember({
                    name: "skill",
                    title: "Skill",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "type",
                            title: "Type",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    validation: (rule) => rule.required(),
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "experience",
            title: "Professional Experience",
            type: "array",
            of: [
                defineArrayMember({
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
                }),
            ],
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
});
