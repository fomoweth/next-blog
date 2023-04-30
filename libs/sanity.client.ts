import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/config";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});
