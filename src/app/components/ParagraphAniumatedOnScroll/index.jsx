'use client';
import styles from './style.module.scss';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const tokenize = (text, phrases) => {
    const sorted = [...phrases].sort((a, b) => b.length - a.length);
    let remaining = text.replace(/\s+/g, ' ').trim();
    const tokens = [];

    while (remaining.length) {
        const phrase = sorted.find((item) =>
            remaining.toLowerCase().startsWith(item.toLowerCase())
        );

        if (phrase) {
            tokens.push({ text: remaining.slice(0, phrase.length), highlight: true });
            remaining = remaining.slice(phrase.length).trimStart();
            continue;
        }

        const space = remaining.indexOf(' ');
        if (space === -1) {
            tokens.push({ text: remaining, highlight: false });
            break;
        }

        tokens.push({ text: remaining.slice(0, space), highlight: false });
        remaining = remaining.slice(space + 1);
    }

    return tokens;
};

function RevealedWord({ token, index, count, scrollProgress }) {
    const start = 0.08 + (index / count) * 0.74;
    const end = Math.min(0.96, start + 0.1);
    const fill = useTransform(scrollProgress, [start, end], [0, 1]);
    const maskImage = useTransform(fill, (value) => {
        const pct = value * 120 - 12;
        return `linear-gradient(90deg, #000 calc(${pct}% - 0.9em), rgba(0,0,0,0.55) calc(${pct}% - 0.28em), transparent ${pct}%)`;
    });
    const glow = useTransform(scrollProgress, [end - 0.05, end], [0, 1]);
    const textShadow = useTransform(
        glow,
        (value) =>
            token.highlight
                ? `0 0 ${18 * value}px rgba(236, 78, 57, ${0.28 * value})`
                : 'none'
    );

    return (
        <span className={styles.word}>
            <span
                className={`${styles.wordBase} ${
                    token.highlight ? styles.highlightBase : ''
                }`}
            >
                {token.text}
            </span>
            <motion.span
                className={`${styles.wordFill} ${
                    token.highlight ? styles.highlightFill : ''
                }`}
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                    textShadow,
                }}
            >
                {token.text}
            </motion.span>
        </span>
    );
}

const isCoarsePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

const ParagraphAniumatedOnScroll = ({
    children,
    globeParentScrollRef,
    trackRef,
    highlightWords,
    progressValue,
    onFlashlight,
}) => {
    const fallbackRef = useRef(null);
    const containerRef = useRef(globeParentScrollRef);
    const sectionRef = useRef(trackRef);
    const progressRef = useRef(progressValue);
    containerRef.current = globeParentScrollRef;
    sectionRef.current = trackRef;
    progressRef.current = progressValue;

    const localProgress = useMotionValue(0);
    const rawProgress = progressValue || localProgress;
    const scrollProgress = useSpring(rawProgress, {
        stiffness: 48,
        damping: 22,
        mass: 0.45,
    });
    const tokens = tokenize(String(children), highlightWords || []);
    const [beam, setBeam] = useState(false);

    useLayoutEffect(() => {
        let frame;
        let container;

        const update = () => {
            const target =
                sectionRef.current?.current || fallbackRef.current;
            if (!container || !target) return;

            const start = target.offsetTop - container.clientHeight * 0.12;
            const end =
                target.offsetTop +
                target.offsetHeight -
                container.clientHeight * 0.78;
            const progress = (container.scrollTop - start) / (end - start);
            rawProgress.set(Math.min(1, Math.max(0, progress)));
        };

        const bind = () => {
            container = containerRef.current?.current;
            if (!container || !(sectionRef.current?.current || fallbackRef.current)) {
                frame = requestAnimationFrame(bind);
                return;
            }

            update();
            container.addEventListener('scroll', update, { passive: true });
            window.addEventListener('resize', update);
        };

        bind();

        return () => {
            cancelAnimationFrame(frame);
            container?.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [rawProgress]);

    const renderWords = (prefix) =>
        tokens.map((token, index) => (
            <RevealedWord
                key={`${prefix}-${token.text}-${index}`}
                token={token}
                index={index}
                count={tokens.length}
                scrollProgress={scrollProgress}
            />
        ));

    const setSpot = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
            '--spot-x',
            `${event.clientX - rect.left}px`
        );
        event.currentTarget.style.setProperty(
            '--spot-y',
            `${event.clientY - rect.top}px`
        );
    };

    return (
        <div
            ref={fallbackRef}
            className={styles.wrapper}
            onMouseEnter={(event) => {
                if (isCoarsePointer()) return;
                setSpot(event);
                setBeam(true);
                onFlashlight?.(true);
            }}
            onMouseMove={(event) => {
                if (isCoarsePointer()) return;
                setSpot(event);
            }}
            onMouseLeave={() => {
                setBeam(false);
                onFlashlight?.(false);
            }}
        >
            {renderWords('base')}
            <div
                className={`${styles.flashlight}${
                    beam ? ` ${styles.flashlightOn}` : ''
                }`}
                aria-hidden
            >
                {renderWords('flash')}
            </div>
        </div>
    );
};

export default ParagraphAniumatedOnScroll;
