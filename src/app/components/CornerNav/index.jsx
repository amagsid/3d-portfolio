'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SPACING, getNavMeshAnchor } from '../HeroDotMesh/grid';
import { subscribeHeroMeshReady } from '../HeroDotMesh/intro';
import styles from './style.module.scss';

const ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
];

const spring = { type: 'spring', stiffness: 420, damping: 28, mass: 0.35 };
const igniteSpring = { type: 'spring', stiffness: 340, damping: 18, mass: 0.45 };
const IGNITE_LEAD = 0.18;
const IGNITE_STAGGER = 0.12;
const MESH_COLOR = 'rgba(183, 171, 152, 0.2)';
const IDLE_COLOR = 'rgba(236, 78, 57, 0.38)';
const HOT_COLOR = '#ec4e39';
const INVERT_IDLE = 'rgba(1, 1, 1, 0.42)';
const INVERT_HOT = '#010101';
const GLOW = '0 0 10px 1px rgba(236, 78, 57, 0.45)';
const NO_GLOW = '0 0 0 0 rgba(236, 78, 57, 0)';

const isCoarse = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sectionTop = (root, el) =>
    el.getBoundingClientRect().top -
    root.getBoundingClientRect().top +
    root.scrollTop;

const measureAnchor = () => {
    const home = document.getElementById('home');
    const width = home?.clientWidth || window.innerWidth;
    const height = home?.clientHeight || window.innerHeight;
    return getNavMeshAnchor(width, height);
};

const CornerNav = ({ scrollRef, invert = false }) => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home');
    const [hovered, setHovered] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const [ready, setReady] = useState(false);
    const [ignited, setIgnited] = useState(false);
    const reducedMotion = prefersReduced();

    useLayoutEffect(() => {
        const update = () => setAnchor(measureAnchor());
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => subscribeHeroMeshReady(setReady), []);

    useEffect(() => {
        if (!ready) {
            setIgnited(false);
            return undefined;
        }
        if (reducedMotion) {
            setIgnited(true);
            return undefined;
        }
        const wait =
            (IGNITE_LEAD + (ITEMS.length - 1) * IGNITE_STAGGER + 0.5) * 1000;
        const timer = window.setTimeout(() => setIgnited(true), wait);
        return () => window.clearTimeout(timer);
    }, [ready, reducedMotion]);

    useEffect(() => {
        const root = scrollRef?.current;
        if (!root) return;

        const update = () => {
            const mark = root.scrollTop + root.clientHeight * 0.32;
            let current = ITEMS[0].id;
            for (const item of ITEMS) {
                const el = root.querySelector(`#${item.id}`);
                if (el && sectionTop(root, el) <= mark) current = item.id;
            }
            setActive(current);
        };

        update();
        root.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            root.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [scrollRef]);

    const go = (id) => {
        const root = scrollRef?.current;
        const el = root?.querySelector(`#${id}`);
        if (!root || !el) return;
        root.scrollTo({ top: sectionTop(root, el), behavior: 'smooth' });
        if (isCoarse()) setOpen(false);
    };

    if (!anchor) return null;

    return (
        <nav
            className={styles.nav}
            aria-label='Sections'
            style={{
                top: anchor.y - SPACING / 2,
                left: anchor.x,
                '--mesh-spacing': `${SPACING}px`,
                pointerEvents: ready ? 'auto' : 'none',
            }}
            onMouseEnter={() => {
                if (!isCoarse()) setOpen(true);
            }}
            onMouseLeave={() => {
                if (!isCoarse()) setOpen(false);
            }}
            onFocus={() => setOpen(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpen(false);
                }
            }}
        >
            {ITEMS.map((item, index) => {
                const hot =
                    ready &&
                    (active === item.id || hovered === item.id || open);
                const ink = invert
                    ? hot
                        ? INVERT_HOT
                        : INVERT_IDLE
                    : !ready
                      ? MESH_COLOR
                      : hot
                        ? HOT_COLOR
                        : IDLE_COLOR;
                return (
                    <button
                        key={item.id}
                        type='button'
                    className={`${styles.item}${
                        active === item.id ? ` ${styles.active}` : ''
                    }${invert ? ` ${styles.invert}` : ''}`}
                        aria-current={active === item.id ? 'true' : undefined}
                        aria-label={item.label}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            if (isCoarse() && !open) {
                                setOpen(true);
                                return;
                            }
                            go(item.id);
                        }}
                    >
                        <motion.span
                            className={styles.label}
                            initial={false}
                            animate={{
                                opacity: open ? 1 : 0,
                                x: open ? 0 : 14,
                                y: '-50%',
                            }}
                            transition={{
                                ...spring,
                                delay: open
                                    ? index * 0.045
                                    : (ITEMS.length - 1 - index) * 0.03,
                            }}
                        >
                            {item.label}
                        </motion.span>
                        <span className={styles.dotWrap} aria-hidden>
                            <motion.span
                                className={styles.dot}
                                initial={false}
                                animate={{
                                    opacity: ready ? 1 : 0,
                                    scale: !ready
                                        ? 0.42
                                        : active === item.id
                                          ? 1.35
                                          : open || hovered === item.id
                                            ? 1.08
                                            : 1,
                                    backgroundColor: ink,
                                    boxShadow:
                                        ready && active === item.id && !invert
                                            ? GLOW
                                            : NO_GLOW,
                                }}
                                transition={{
                                    opacity: { duration: 0 },
                                    backgroundColor: {
                                        duration: ignited ? 0.18 : 0.42,
                                        delay:
                                            ignited || reducedMotion
                                                ? 0
                                                : IGNITE_LEAD +
                                                  index * IGNITE_STAGGER,
                                    },
                                    boxShadow: {
                                        duration: ignited ? 0.18 : 0.42,
                                        delay:
                                            ignited || reducedMotion
                                                ? 0
                                                : IGNITE_LEAD +
                                                  index * IGNITE_STAGGER,
                                    },
                                    scale: {
                                        ...(ignited ? spring : igniteSpring),
                                        delay:
                                            ignited || reducedMotion
                                                ? 0
                                                : IGNITE_LEAD +
                                                  index * IGNITE_STAGGER,
                                    },
                                }}
                            />
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default CornerNav;
