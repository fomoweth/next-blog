import { buildClass } from "libs/utils";

type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Weight = "bold" | "semibold" | "medium" | "normal" | "light";

interface Props {
    level?: Level;
    weight?: Weight;
    children: React.ReactNode;
    cls?: string;
}

export default function HeaderText({
    level,
    weight = "normal",
    children,
    cls,
}: Props) {
    switch (level) {
        case "h1":
            return (
                <h1
                    className={buildClass(
                        `text-5xl font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h1>
            );

        case "h2":
            return (
                <h2
                    className={buildClass(
                        `text-4xl font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h2>
            );

        case "h3":
            return (
                <h3
                    className={buildClass(
                        `text-3xl font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h3>
            );

        case "h4":
            return (
                <h4
                    className={buildClass(
                        `text-2xl font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h4>
            );

        case "h5":
            return (
                <h5
                    className={buildClass(
                        `text-1xl font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h5>
            );

        case "h6":
            return (
                <h6
                    className={buildClass(
                        `text-lg font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h6>
            );

        default:
            return (
                <h2
                    className={buildClass(
                        `text-base font-${weight} leading-relaxed`,
                        cls || ""
                    )}
                >
                    {children}
                </h2>
            );
    }
}
