'use client'
import { useState, useRef, useCallback, useEffect } from "react";
export type RefReadable<T extends Element> = { current: T | null }
export default function useScrollbarSync<
    TContent extends HTMLElement = HTMLDivElement,
    TTrack extends HTMLElement = HTMLDivElement
>(
    contentRef: RefReadable<TContent>,
    scrollbarRef: RefReadable<TTrack>
) {
    const [scrollContentWidth, setScrollContentWidth] = useState<number>(0);
    const activeSourceRef = useRef<null | 'content' | 'scrollbar'>(null);
    const cachedSizesRef = useRef({ contentScrollWidth: 0, contentClientWidth: 0, trackClientWidth: 0 });
    const recalculate = useCallback(() => {
        const content = contentRef.current;
        const track = scrollbarRef.current;
        if (!content || !track) return;

        const contentScrollWidth = content.scrollWidth;
        const contentClientWidth = content.clientWidth;
        const trackClientWidth = track.clientWidth;

        const previousSizes = cachedSizesRef.current;
        if (
            previousSizes.contentScrollWidth === contentScrollWidth &&
            previousSizes.contentClientWidth === contentClientWidth &&
            previousSizes.trackClientWidth === trackClientWidth
        ) {
            return;
        }

        cachedSizesRef.current = { contentScrollWidth, contentClientWidth, trackClientWidth };

        const projected = contentScrollWidth - (contentClientWidth - trackClientWidth);
        const nextWidth = Math.max(0, Math.round(projected));
        setScrollContentWidth((prevWidth) => (prevWidth === nextWidth ? prevWidth : nextWidth));
    }, [contentRef, scrollbarRef]);
    const onContentScroll = useCallback(() => {
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
    }, [contentRef, scrollbarRef]);
    const onScrollbarScroll = useCallback(() => {
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
    }, [contentRef, scrollbarRef]);

    useEffect(() => {
        const content = contentRef.current;
        const scrollbar = scrollbarRef.current;
        if (!content || !scrollbar) return;
        recalculate();

        content.addEventListener('scroll', onContentScroll, { passive: true })
        scrollbar.addEventListener('scroll', onScrollbarScroll, { passive: true })

        let resizeObserver: ResizeObserver | null = null;
        let cleanupWindow: (() => void) | null = null;

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => recalculate());
            resizeObserver.observe(content);
            resizeObserver.observe(scrollbar);
        } else {
            window.addEventListener("resize", recalculate);
            window.addEventListener("orientationchange", recalculate);

            cleanupWindow = () => {
                window.removeEventListener("resize", recalculate);
                window.removeEventListener("orientationchange", recalculate);
            };
        }

        return () => {
            content.removeEventListener("scroll", onContentScroll);
            scrollbar.removeEventListener("scroll", onScrollbarScroll);
            resizeObserver?.disconnect();
            cleanupWindow?.();
        };
    }, [contentRef, scrollbarRef, onContentScroll, onScrollbarScroll, recalculate]);

    return { scrollContentWidth };
}