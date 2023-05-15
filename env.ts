export const projectId = assertEnvConfig(
    "SANITY_PROJECT_ID",
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);

export const dataset = assertEnvConfig(
    "SANITY_DATASET",
    process.env.NEXT_PUBLIC_SANITY_DATASET
);

export const apiVersion = assertEnvConfig(
    "SANITY_API_VERSION",
    process.env.NEXT_PUBLIC_SANITY_API_VERSION
);

export const token = {
    read: assertEnvConfig(
        "SANITY_API_READ_TOKEN",
        process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN
    ),
    write: assertEnvConfig(
        "SANITY_API_WRITE_TOKEN",
        process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN
    ),
};

export const previewSecretId = assertEnvConfig<`${string}.${string}`>(
    "SANITY_PREVIEW_SECRET_ID",
    process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET_ID as `${string}.${string}`
);

export const previewSecretIdRequired = assertEnvConfig(
    "NEXT_PUBLIC_SANITY_PREVIEW_SECRET_ID_REQUIRED",
    process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET_ID_REQUIRED
);

export const useCdn = false;

function assertEnvConfig<T>(key: string, value?: T): T {
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
}
