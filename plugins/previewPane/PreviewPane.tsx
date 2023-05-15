import { useClient } from "sanity";
import { UserViewComponent } from "sanity/desk";
import { Card, Text } from "@sanity/ui";
import { ComponentProps, Suspense } from "react";
import { memo } from "react";
import { suspend } from "suspend-react";
import getSecret from "libs/sanity.secret";
import { resolvePath } from "libs/utils";
import { previewSecretId } from "env";

export type PreviewProps = ComponentProps<UserViewComponent> & {
    previewSecretId: `${string}.${string}`;
    apiVersion: string;
};

interface IframeProps {
    apiVersion: string;
    documentType?: string;
    previewSecretId: `${string}.${string}`;
    slug?: string;
}

export default function PreviewPane(props: PreviewProps) {
    const { document, previewSecretId, apiVersion } = props;
    const { displayed } = document;
    const documentType = displayed?._type;
    let slug = (displayed?.slug as any)?.current;

    const path = resolvePath(documentType, displayed?.slug as string);

    if (!path) {
        return (
            <Card tone="primary" margin={5} padding={6}>
                <Text align="center">
                    Please add a slug to the post to see the preview!
                </Text>
            </Card>
        );
    }

    return (
        <Card
            scheme="light"
            style={{ width: "100%", height: "100%", position: "relative" }}
        >
            <Suspense fallback={null}>
                <Iframe
                    apiVersion={apiVersion}
                    documentType={documentType}
                    previewSecretId={previewSecretId}
                    slug={slug}
                />
            </Suspense>
        </Card>
    );
}

const fetchSecret = Symbol(previewSecretId);

const Iframe = memo(function Iframe(props: IframeProps) {
    const { apiVersion, documentType, previewSecretId, slug } = props;

    const client = useClient({ apiVersion });

    const secret = suspend(
        () => getSecret(client, previewSecretId, true),
        ["getSecret", previewSecretId, fetchSecret],
        { lifespan: 60000 }
    );

    const url = new URL("/api/preview", location.origin);

    if (documentType) {
        url.searchParams.set("type", documentType);
    }

    if (slug) {
        url.searchParams.set("slug", slug);
    }

    if (secret) {
        url.searchParams.set("secret", secret);
    }

    return (
        <iframe
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 1,
            }}
            src={url.toString()}
        />
    );
});
