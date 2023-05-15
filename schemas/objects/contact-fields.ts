import { defineField } from "sanity";

export default defineField({
    name: "contact",
    title: "Contact",
    type: "object",
    fields: [
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            initialValue: "Pomona, CA",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            initialValue: "rykim0100@gmail.com",
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
});
