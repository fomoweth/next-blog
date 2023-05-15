interface Settings {
    metadata: {
        title: string;
        description: Block[];
    };
    description: Block[];
    paths: string[];
    postsOffset: number;
    projectsOffset: number;
    experienceOffset: number;
    iconLinks: {
        email: string;
        blog: string;
        linkedin: string;
        twitter: string;
        github: string;
    };
}

interface Author {
    location: string;
    experience: Experience[];
    skills: {
        title: string;
        type: string;
    }[];
}

interface Experience {
    company: string;
    description: Block[];
    role: string;
    link: string;
    startDate: string;
    endDate: string;
    keyPoints: string[];
}

interface Post {
    title: string;
    slug: string;
    date: string;
    tags: Tag[];
    coverImage?: CoverImage;
    description: Block[];
    content: (Block | Image)[];
}

interface Project {
    title: string;
    slug: string;
    date: string;
    link: string;
    description: Block[];
    keyPoints: string[];
    isPersonal: boolean;
}

interface Slug {
    _type: "slug";
    current: string;
}

interface Tag {
    title: string;
    slug: string;
    size?: number;
}

interface Base {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

interface Block {
    _key: string;
    _type: "block";
    children: Span[];
    markDefs: any[];
    style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

interface CoverImage {
    _type: "image";
    asset: Reference;
}

interface Image {
    _key?: string;
    _type: "image";
    asset: Asset;
    alt?: string;
}

interface Asset extends Reference {
    assetId?: string;
    uploadId?: string;
    sha1hash?: string;
    url?: string;
    path?: string;
    extension?: string;
    mimeType?: string;
    size?: number;
    originalFilename?: string;
    metadata: Metadata;
}

interface Metadata {
    _type?: string;
    lqip?: string;
    blurHash?: string;
    dimensions: { _type?: string } & Dimension;
    palette?: { [key: string]: { [key: string]: string } };
    hasAlpha?: boolean;
    isOpaque?: boolean;
}

interface Dimension {
    width: number;
    height: number;
    aspectRatio: number;
}

interface Reference extends Base {
    _ref: string;
    _type: "reference";
}

interface Span {
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
}
