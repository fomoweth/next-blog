import type { Image as SanityImage } from "sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import {
    SanityAsset,
    SanityImageObject,
    SanityImageSource,
    SanityReference,
} from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "env";

const builder = createImageUrlBuilder({ projectId, dataset });

type ImageSource = Image | SanityImage;

export default function urlFor(source: ImageSource): ImageUrlBuilder {
    return builder.image(source);
}

export function getDimensions(source: SanityImageSource): Dimension {
    const id = getSourceId(source);
    const dimensions = id.split("-")[2];

    const [width, height] = dimensions
        .split("x")
        .map((x: string) => parseInt(x));

    const aspectRatio = width / height;

    return { height, width, aspectRatio };
}

function getSourceId(source: SanityImageSource): string {
    if (typeof source === "string") {
        return source;
    }

    const obj = source as SanityImageObject;
    const ref = source as SanityReference;
    const asset = source as SanityAsset;

    if (obj.asset) {
        return obj.asset._ref || (obj.asset as SanityAsset)._id;
    }

    return ref._ref || asset._id || "";
}
