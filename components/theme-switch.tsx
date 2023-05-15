import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DarkMode, LightMode } from "./icons";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <button
                className="group rounded-full bg-white/90 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:text-teal-500 dark:bg-zinc-800/90"
                type="button"
                onClick={() =>
                    setTheme(
                        theme === "dark" || resolvedTheme === "dark"
                            ? "light"
                            : "dark"
                    )
                }
                aria-label="Toggle Dark Mode"
            >
                <LightMode cls="block h-6 w-6 dark:hidden" />
                <DarkMode cls="hidden h-6 w-6 dark:block" />
            </button>
        </div>
    );
}
