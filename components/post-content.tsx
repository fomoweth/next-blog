import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import urlFor, { getDimensions } from "libs/sanity.image";

interface Props {
    post: Post;
}

export default function PostContent({ post }: Props) {
    return (
        <div className="w-full border-b border-gray-400 p-5">
            <div className="mb-10">
                <PortableText value={post.content} components={components} />
            </div>
        </div>
    );
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            const { height, width } = getDimensions(value);

            return (
                <div className="flex flex-col items-center py-5">
                    <Image
                        className="object-contain"
                        src={urlFor(value).url()}
                        alt={value.alt ?? "blog post image"}
                        sizes="(max-width: 900px) 100vw, 800px"
                        width={width}
                        height={height}
                        loading="lazy"
                    />

                    {value.caption ? (
                        <p className="py-2 text-base text-gray-400">
                            {value.caption}
                        </p>
                    ) : null}
                </div>
            );
        },
        code: ({ value }) => {
            if (!value) return null;

            const {
                language,
                code,
                filename,
            }: {
                language: string;
                code: string;
                filename?: string;
            } = value;

            return (
                <div className="py-5">
                    {filename ? (
                        <h5 className="text-3xl font-semibold">{filename}</h5>
                    ) : null}
                    <SyntaxHighlighter language={language} style={style as any}>
                        {code}
                    </SyntaxHighlighter>
                </div>
            );
        },
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc space-y-5 py-1 md:ml-10">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="mt-lg list-decimal">{children}</ol>
        ),
    },
    block: {
        h1: ({ children }) => (
            <h1 className="py-5 text-5xl font-semibold">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="py-5 text-4xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="py-5 text-3xl font-semibold">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="py-5 text-2xl font-semibold">{children}</h4>
        ),
        h5: ({ children }) => (
            <h5 className="py-5 text-2xl font-semibold">{children}</h5>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-l-teal-500 py-5 pl-5">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => (
            <p className="py-2 text-base font-normal">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <span className="font-semibold">{children}</span>
        ),
        underline: ({ children }) => (
            <span className="underline">{children}</span>
        ),
        center: ({ children }) => (
            <span className="text-center">{children}</span>
        ),
        highlight: ({ children }) => (
            <span className="dark:text-blu-700/90 font-semibold text-blue-500">
                {children}
            </span>
        ),
        link: ({ children, value: { url, target } }) => {
            return (
                <Link
                    className="dark:text-blu-700/90 text-blue-500 hover:underline"
                    href={url}
                    target={target}
                >
                    {children}
                </Link>
            );
        },
    },
};

const style = {
    'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
    },
    'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "#282a36",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em",
    },
    ':not(pre) > code[class*="language-"]': {
        background: "#282a36",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal",
    },
    comment: {
        color: "#6272a4",
    },
    prolog: {
        color: "#6272a4",
    },
    doctype: {
        color: "#6272a4",
    },
    cdata: {
        color: "#6272a4",
    },
    punctuation: {
        color: "#f8f8f2",
    },
    ".namespace": {
        Opacity: ".7",
    },
    property: {
        color: "#ff79c6",
    },
    tag: {
        color: "#ff79c6",
    },
    constant: {
        color: "#ff79c6",
    },
    symbol: {
        color: "#ff79c6",
    },
    deleted: {
        color: "#ff79c6",
    },
    boolean: {
        color: "#bd93f9",
    },
    number: {
        color: "#bd93f9",
    },
    selector: {
        color: "#50fa7b",
    },
    "attr-name": {
        color: "#50fa7b",
    },
    string: {
        color: "#50fa7b",
    },
    char: {
        color: "#50fa7b",
    },
    builtin: {
        color: "#50fa7b",
    },
    inserted: {
        color: "#50fa7b",
    },
    operator: {
        color: "#f8f8f2",
    },
    entity: {
        color: "#f8f8f2",
        cursor: "help",
    },
    url: {
        color: "#f8f8f2",
    },
    ".language-css .token.string": {
        color: "#f8f8f2",
    },
    ".style .token.string": {
        color: "#f8f8f2",
    },
    variable: {
        color: "#f8f8f2",
    },
    atrule: {
        color: "#f1fa8c",
    },
    "attr-value": {
        color: "#f1fa8c",
    },
    function: {
        color: "#f1fa8c",
    },
    "class-name": {
        color: "#f1fa8c",
    },
    keyword: {
        color: "#8be9fd",
    },
    regex: {
        color: "#ffb86c",
    },
    important: {
        color: "#ffb86c",
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
};
