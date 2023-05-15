import { definePlugin } from "sanity";
import getSecret from "libs/sanity.secret";

export default definePlugin<{
    previewSecretId: `${string}.${string}`;
    types: string[];
    apiVersion: string;
}>(({ previewSecretId, types: _types, apiVersion }) => {
    if (!previewSecretId) {
        throw new TypeError("Missing preview secret id");
    }

    if (!previewSecretId.includes(".")) {
        throw new TypeError("Invalid preview secret id");
    }

    if (!_types || _types.length === 0) {
        throw new TypeError("Missing document types");
    }

    const types = new Set(_types);

    return {
        name: "productionUrl",
        document: {
            productionUrl: async (prev, { document, getClient }) => {
                const url = new URL("/api/preview", location.origin);

                const client = getClient({ apiVersion });
                const secret = await getSecret(client, previewSecretId, true);

                if (secret) {
                    url.searchParams.set("secret", secret);
                }

                const slug = (document.slug as Slug)?.current;

                if (slug) {
                    url.searchParams.set("slug", slug);
                }

                if (types.has(document._type)) {
                    url.searchParams.set("type", document._type);

                    return url.toString();
                }

                return prev;
            },
        },
    };
});
