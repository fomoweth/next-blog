import { formatDate } from "libs/utils";

interface Props {
    date: string;
    month: "numeric" | "long" | "short";
    day?: boolean;
    fontSize?: "lg" | "base" | "sm";
}

export default function Date({ date, month, day, fontSize = "sm" }: Props) {
    const formatted = formatDate(date, month, day);

    return (
        <time
            className={`text-${fontSize} font-light text-zinc-600 dark:text-zinc-400`}
            dateTime={formatted}
        >
            {formatted}
        </time>
    );
}
