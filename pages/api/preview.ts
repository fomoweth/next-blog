import type { NextApiRequest, NextApiResponse } from "next";
import type { PageConfig } from "next/types";
import { client } from "libs/sanity.client";
import getSecret from "libs/sanity.secret";
import { resolvePath } from "libs/utils";
import { previewSecretId, previewSecretIdRequired, token } from "env";

export const config: PageConfig = { runtime: "nodejs" };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | void>
) {
    const previewData: { token?: string } = {};

    if (previewSecretIdRequired === "true" && !req.query.secret) {
        return res.status(401).send("Missing secret id");
    }

    if (req.query.secret) {
        const secret = await getSecret(client, previewSecretId);

        if (req.query.secret !== secret) {
            return res.status(401).send("Invalid secret id");
        }

        previewData.token = token.read;
    }

    const path = resolvePath(
        req.query.type as string,
        req.query.slug as string
    );

    if (!path) {
        return res
            .status(400)
            .send(
                "Failed to resolve preview path based on the given document type and slug"
            );
    }

    res.setPreviewData(previewData);
    res.writeHead(307, { Location: path });
    res.end();
}
