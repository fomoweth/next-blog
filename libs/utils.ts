export function buildClass(...classNames: string[]): string {
    return classNames.join(" ");
}

export function capitalize(value: string): string {
    return value
        .split(" ")
        .map((char) => char[0].toUpperCase() + char.slice(1))
        .join(" ");
}

export function formatTag(value: string): string {
    return value.split(" ").join("-");
}

export function formatUrl(value: string): string {
    return value.replace(/^\/\/|^.*?:(\/\/)?(?:www\.)?/, "");
}

export function formatDate(
    date: string,
    month: "numeric" | "long" | "short",
    day?: boolean
): string {
    return new Date(date).toLocaleDateString("en-US", {
        day: !!day ? "numeric" : undefined,
        month: month,
        year: "numeric",
        timeZone: "UTC",
    });
}

export function resolvePath(type?: string, slug?: string): string | undefined {
    switch (type) {
        case "post":
            return slug ? `/posts/${slug}` : "/posts";

        case "project":
            return "/projects";

        case "tag":
            return slug ? `/tags/${slug}` : "/tags";

        default:
            return undefined;
    }
}

export function destructureObj(obj: Record<string, any>): Record<string, any> {
    Object.keys(obj).forEach((key) => {
        const property = obj[key];

        if (typeof property === "object") {
            delete obj[key];

            Object.assign(obj, property);
        }
    });

    return obj;
}

export function duplicateObj(obj: Record<string, any>, keys: string[] = []) {
    if (!keys.length) {
        keys = Object.keys(obj);
    }

    const properties: Record<string, any> = {};

    keys.forEach((key) => {
        properties[key] = obj[key as keyof typeof obj];
    });

    return properties;
}
