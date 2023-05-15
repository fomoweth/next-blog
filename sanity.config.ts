import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { codeInput } from "@sanity/code-input";
import { LaunchIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { previewDocumentNode } from "plugins/previewPane";
import productionUrl from "plugins/productionUrl";
import singleton from "plugins/singleton";
import structures from "plugins/structures";
import schemaType, { schemaTypes } from "schemas";
import { apiVersion, dataset, previewSecretId, projectId } from "env";

export const PREVIEW_DOCUMENT_TYPES: string[] = [
    schemaType.post.name,
    schemaType.project.name,
    schemaType.tag.name,
];

export default defineConfig([
    {
        basePath: "/studio",
        name: "studio",
        title: "Studio",
        icon: LaunchIcon,
        projectId,
        dataset,
        plugins: [
            deskTool({
                structure: structures(schemaType.settings, schemaType.author),
                defaultDocumentNode: previewDocumentNode({
                    apiVersion,
                    previewSecretId,
                }),
            }),
            singleton({
                types: [schemaType.settings.name, schemaType.author.name],
            }),
            productionUrl({
                apiVersion,
                previewSecretId,
                types: PREVIEW_DOCUMENT_TYPES,
            }),
            unsplashImageAsset(),
            visionTool({ defaultApiVersion: apiVersion }),
            codeInput(),
        ],
        schema: {
            types: schemaTypes,
        },
    },
]);
