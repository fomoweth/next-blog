import { definePlugin } from "sanity";

export default definePlugin<{ types: string[] }>(({ types }) => {
    return {
        name: "singleton",
        document: {
            newDocumentOptions: (prev, { creationContext }) => {
                if (creationContext.type === "global") {
                    return prev.filter(
                        (templateItem) =>
                            !types.includes(templateItem.templateId)
                    );
                }

                return prev;
            },

            actions: (prev, { schemaType }) => {
                if (types.includes(schemaType)) {
                    return prev.filter(
                        ({ action }) =>
                            action !== "duplicate" &&
                            action !== "delete" &&
                            action !== "unpublish"
                    );
                }

                return prev;
            },
        },
    };
});
