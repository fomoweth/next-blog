import type { NextApiRequest, NextApiResponse } from "next";
import type { PageConfig } from "next/types";
import { client as _client } from "libs/sanity.client";
import getSecret from "libs/sanity.secret";
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
        const client = _client.withConfig({
            useCdn: false,
            token: token.write,
        });
        const secret = await getSecret(client, previewSecretId);

        if (req.query.secret !== secret) {
            return res.status(401).send("Invalid secret id");
        }

        previewData.token = token.write;
    }

    if (!req.query.slug) {
        return redirectToPreview(res, previewData, "/");
    }

    redirectToPreview(res, previewData, `/posts/${req.query.slug}`);
}

function redirectToPreview(
    res: NextApiResponse<string | void>,
    previewData: { token?: string },
    path: string
): void {
    res.setPreviewData(previewData);
    res.writeHead(307, { Location: path });
    res.end();
}
