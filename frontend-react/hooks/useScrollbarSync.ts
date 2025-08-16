import { MutableRefObject, useState, useRef, useMemo, useEffect } from "react";

export default function useScrollbarSync(
    contentRef: MutableRefObject<HTMLDivElement | null>,
    scrollbarRef: MutableRefObject<HTMLDivElement | null>
) {
    const [scrollContentWidth, setScrollContentWidth] = useState<number>(0);
    const activeSourceRef = useRef<null | 'content' | 'scrollbar'>(null);
    const sizesRef = useRef({ contentScrollWidth: 0, contentClientWidth: 0, trackClientWidth: 0 });
    const recalculate = useMemo(() => {
        return () => {
            const content = contentRef.current;
            const track = scrollbarRef.current;
            if (!content || !track) return;

            const contentScrollWidth = content.scrollWidth;
            const contentClientWidth = content.clientWidth;
            const trackClientWidth = track.clientWidth;

            const prev = sizesRef.current;
            if (
                prev.contentScrollWidth === contentScrollWidth &&
                prev.contentClientWidth === contentClientWidth &&
                prev.trackClientWidth === trackClientWidth
            ) {
                return;
            }

            sizesRef.current = { contentScrollWidth, contentClientWidth, trackClientWidth };

            const projected = contentScrollWidth - (contentClientWidth - trackClientWidth);
            const nextWidth = Math.max(0, Math.round(projected));
            setScrollContentWidth((prevWidth) => (prevWidth === nextWidth ? prevWidth : nextWidth));
        };
    }, [contentRef, scrollbarRef]);
    const onContentScroll = useMemo(() => {
        return () => {
            const content = contentRef.current;
            const scrollbar = scrollbarRef.current;
            if (!content || !scrollbar) return;

            if (activeSourceRef.current === "scrollbar") return;

            activeSourceRef.current = "content";
            scrollbar.scrollLeft = content.scrollLeft;

            requestAnimationFrame(() => {
                if (activeSourceRef.current === "content") {
                    activeSourceRef.current = null;
                }
            });
        };
    }, [contentRef, scrollbarRef]);
    const onScrollbarScroll = useMemo(() => {
        return () => {
            const content = contentRef.current;
            const scrollbar = scrollbarRef.current;
            if (!content || !scrollbar) return;

            if (activeSourceRef.current === "content") return;

            activeSourceRef.current = "scrollbar";
            content.scrollLeft = scrollbar.scrollLeft;

            requestAnimationFrame(() => {
                if (activeSourceRef.current === "scrollbar") {
                    activeSourceRef.current = null;
                }
            });
        };
    }, [contentRef, scrollbarRef]);

    useEffect(() => {
        const content = contentRef.current;
        const scrollbar = scrollbarRef.current;
        if (!content || !scrollbar) return;
        recalculate();

        const contentScrollHandler = () => onContentScroll();
        const scrollbarScrollHandler = () => onScrollbarScroll();

        content.addEventListener("scroll", contentScrollHandler, { passive: true });
        scrollbar.addEventListener("scroll", scrollbarScrollHandler, { passive: true });

        let roContent: ResizeObserver | null = null;
        let roScrollbar: ResizeObserver | null = null;
        let cleanupWin: (() => void) | null = null;

        if (typeof ResizeObserver !== "undefined") {
            roContent = new ResizeObserver(() => recalculate());
            roScrollbar = new ResizeObserver(() => recalculate());
            roContent.observe(content);
            roScrollbar.observe(scrollbar);
        } else {
            const onWinResize = () => recalculate();
            window.addEventListener("resize", onWinResize);
            window.addEventListener("orientationchange", onWinResize);

            cleanupWin = () => {
                window.removeEventListener("resize", onWinResize);
                window.removeEventListener("orientationchange", onWinResize);
            };
        }

        return () => {
            content.removeEventListener("scroll", contentScrollHandler);
            scrollbar.removeEventListener("scroll", scrollbarScrollHandler);
            roContent?.disconnect();
            roScrollbar?.disconnect();
            cleanupWin?.();
        };
    }, [contentRef, scrollbarRef, onContentScroll, onScrollbarScroll, recalculate]);

    return { scrollContentWidth };
}