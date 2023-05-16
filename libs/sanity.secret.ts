const query = (ttl: number) =>
    `*[_id == $id && dateTime(_updatedAt) > dateTime(now()) - ${ttl}][0].secret`;

const tag = "preview.secret";

export default async function getSecret(
    client: import("next-sanity").SanityClient | import("sanity").SanityClient,
    id: `${string}.${string}`,
    createIfNotExists?: true | (() => string)
): Promise<string | null> {
    const secret = await client.fetch<string | null>(
        query(createIfNotExists ? 60 * 30 : 60 * 60),
        { id }
    );

    if (!secret && createIfNotExists) {
        const newSecret =
            createIfNotExists === true
                ? Math.random().toString(36).slice(2)
                : createIfNotExists();

        try {
            const patch = client.patch(id).set({ secret: newSecret });

            await client
                .transaction()
                .createIfNotExists({ _id: id, _type: id })
                .patch(patch)
                .commit({ tag });

            return newSecret;
        } catch (e) {
            console.error(
                "Failed to create a new preview secret. Ensure the `client` has a `token` specified that has `write` permissions.",
                e
            );
        }
    }

    return secret;
}
