import { defineArrayMember, defineField } from "sanity";

export default defineField({
    name: "description",
    title: "Description",
    type: "array",
    of: [
        defineArrayMember({
            title: "Block",
            type: "block",
            styles: [{ title: "Normal", value: "normal" }],
            lists: [],
        }),
    ],
});
