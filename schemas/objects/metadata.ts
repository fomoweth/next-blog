import { defineField } from "sanity";

export default defineField({
    name: "metadata",
    title: "Metadata",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            initialValue: "rkim.xyz",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [
                {
                    title: "Block",
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [],
                },
            ],
            validation: (rule) => rule.required(),
        }),
    ],
});
