import { DefaultDocumentNodeResolver } from "sanity/desk";
import { PREVIEW_DOCUMENT_TYPES } from "sanity.config";
import PreviewPane from "./PreviewPane";

export const previewDocumentNode = ({
    apiVersion,
    previewSecretId,
}: {
    apiVersion: string;
    previewSecretId: `${string}.${string}`;
}): DefaultDocumentNodeResolver => {
    return (S, { schemaType }) => {
        if (PREVIEW_DOCUMENT_TYPES.includes(schemaType)) {
            return S.document().views([
                S.view.form(),
                S.view
                    .component((props) => (
                        <PreviewPane
                            previewSecretId={previewSecretId}
                            apiVersion={apiVersion}
                            {...props}
                        />
                    ))
                    .title("Preview"),
            ]);
        }

        return null;
    };
};
