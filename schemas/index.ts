import post from "./documents/post";
import project from "./documents/project";
// import skill from "./documents/skill";
import tag from "./documents/tag";
// import workExperience from "./documents/workExperience";
import blockContent from "./objects/block-content";
// import contactFields from "./objects/contact-fields";
import description from "./objects/description";
// import experience from "./objects/experience";
import metadata from "./objects/metadata";
import author from "./singletons/author";
import settings from "./singletons/settings";

const schemaType = {
    author,
    blockContent,
    // contactFields,
    description,
    // experience,
    metadata,
    post,
    project,
    settings,
    // skill,
    tag,
    // workExperience,
};

export const schemaTypes = Object.values(schemaType);

export default schemaType;
