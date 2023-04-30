import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataset, projectId } from "./config";

export default defineConfig({
    basePath: "/studio",
    name: "RK_Blog_Studio",
    title: "RK Blog Studio",

    projectId,
    dataset,

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
