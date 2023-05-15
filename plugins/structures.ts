import type { DocumentDefinition } from "sanity";
import type { StructureResolver } from "sanity/desk";

export default function structures(
    ...types: DocumentDefinition[]
): StructureResolver {
    return (S) => {
        const listItems = types.map((typeDef) => {
            return S.listItem()
                .title(typeDef.title!)
                .icon(typeDef.icon)
                .child(
                    S.editor()
                        .id(typeDef.name)
                        .schemaType(typeDef.name)
                        .documentId(typeDef.name)
                );
        });

        const defaultListItems = S.documentTypeListItems().filter((listItem) =>
            types.every((typeDef) => typeDef.name !== listItem.getId())
        );

        return S.list()
            .title("Content")
            .items([...listItems, S.divider(), ...defaultListItems]);
    };
}
