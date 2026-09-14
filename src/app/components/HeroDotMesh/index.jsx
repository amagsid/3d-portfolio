'use client';
import { useEffect, useRef } from 'react';
import { SPACING, getMeshGrid, isNavMeshCell } from './grid';
import { notifyHeroMeshReady, resetHeroMeshReady } from './intro';

const DOT_R = 1.15;
const INFLUENCE = 130;
const MAX_PULL = 12;
const SETTLE = 0.04;
const POINTER_SPRING = 0.22;
const POINTER_DAMP = 0.72;
const METAL = [183, 171, 152];
const ORANGE = [236, 78, 57];

const VARIANT = {
    hero: {
        introSpring: 0.22,
        introDamp: 0.72,
        restAlpha: 0.2,
    },
    contact: {
        introSpring: 0.13,
        introDamp: 0.8,
        restAlpha: 0.26,
    },
};

const isStaticPointer = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches);

const buildGrid = (width, height, variant) => {
    const { cols, rows, ox, oy } = getMeshGrid(width, height);
    const count = cols * rows;
    const restX = new Float32Array(count);
    const restY = new Float32Array(count);
    const fromX = new Float32Array(count);
    const fromY = new Float32Array(count);
    const delay = new Float32Array(count);
    const x = new Float32Array(count);
    const y = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const contact = variant === 'contact';
    const side = Math.min(width * 0.16, 110);
    const drop = Math.min(height * 0.62, 320);
    let i = 0;
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            const px = ox + col * SPACING;
            const py = oy + row * SPACING;
            restX[i] = px;
            restY[i] = py;
            if (contact) {
                fromX[i] = px;
                fromY[i] = py - drop - row * 10;
                delay[i] = row * 22 + col * 4;
            } else {
                fromX[i] = px - side - col * 5;
                fromY[i] = py;
                delay[i] = col * 9 + row * 2;
            }
            x[i] = fromX[i];
            y[i] = fromY[i];
            i += 1;
        }
    }
    let maxDelay = 0;
    for (let d = 0; d < count; d += 1) {
        if (delay[d] > maxDelay) maxDelay = delay[d];
    }
    return {
        count,
        cols,
        restX,
        restY,
        fromX,
        fromY,
        delay,
        x,
        y,
        vx,
        vy,
        maxDelay,
    };
};

const paintDots = (ctx, dots, pointer, interactive, dpr, restAlpha, skipNav) => {
    const { count, cols, restX, restY, fromX, fromY, x, y } = dots;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let i = 0; i < count; i += 1) {
        if (skipNav && isNavMeshCell(i % cols, (i / cols) | 0, cols)) {
            continue;
        }

        let falloff = 0;
        let nx = 0;
        let ny = 0;
        if (interactive && pointer.active) {
            const dx = pointer.x - restX[i];
            const dy = pointer.y - restY[i];
            const dist = Math.hypot(dx, dy);
            if (dist < INFLUENCE && dist > 0.0001) {
                const t = 1 - dist / INFLUENCE;
                falloff = t * t * (3 - 2 * t);
                nx = dx / dist;
                ny = dy / dist;
            }
        }

        const travel = Math.hypot(x[i] - restX[i], y[i] - restY[i]);
        const span = Math.max(
            1,
            Math.hypot(fromX[i] - restX[i], fromY[i] - restY[i])
        );
        const arrived = Math.min(1, 1 - travel / span);
        const mix = falloff;
        const r = METAL[0] + (ORANGE[0] - METAL[0]) * mix;
        const g = METAL[1] + (ORANGE[1] - METAL[1]) * mix;
        const b = METAL[2] + (ORANGE[2] - METAL[2]) * mix;
        const alpha = (restAlpha + mix * 0.42) * (0.28 + arrived * 0.72);
        const radius = DOT_R + mix * 0.85 + (1 - arrived) * 0.35;
        const px = x[i];
        const py = y[i];

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
        ctx.fill();

        if (mix > 0.08) {
            ctx.beginPath();
            ctx.arc(
                px - nx * 0.95,
                py - ny * 0.95,
                radius * 0.38,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = `rgba(255, 196, 176, ${0.12 + mix * 0.4})`;
            ctx.fill();
        }
    }
};

const HeroDotMesh = ({ variant = 'hero', active = true }) => {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const activeRef = useRef(active);
    const restartRef = useRef(() => {});
    activeRef.current = active;

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const staticMode = isStaticPointer();
        const settings = VARIANT[variant] || VARIANT.hero;
        const contact = variant === 'contact';
        const skipNav = !contact;
        let dots = buildGrid(1, 1, variant);
        let inView = false;
        let running = false;
        let frame = 0;
        let introT0 = 0;
        let introDone = false;
        let hideNavCells = false;
        let navSkipTimer = 0;
        let pendingIntro = !staticMode;
        const pointer = { x: 0, y: 0, active: false };
        let width = 0;
        let height = 0;
        let dpr = 1;

        const coverNavCells = () => {
            if (!skipNav || hideNavCells) return;
            hideNavCells = true;
        };

        const finishIntro = () => {
            if (introDone) return;
            introDone = true;
            if (!skipNav) return;
            notifyHeroMeshReady();
            navSkipTimer = window.setTimeout(coverNavCells, 80);
        };

        const seed = (atRest) => {
            for (let i = 0; i < dots.count; i += 1) {
                if (atRest) {
                    dots.x[i] = dots.restX[i];
                    dots.y[i] = dots.restY[i];
                } else {
                    dots.x[i] = dots.fromX[i];
                    dots.y[i] = dots.fromY[i];
                }
                dots.vx[i] = 0;
                dots.vy[i] = 0;
            }
            window.clearTimeout(navSkipTimer);
            hideNavCells = false;
            introDone = atRest;
            introT0 = atRest ? 0 : performance.now();
            if (skipNav) {
                if (atRest) {
                    notifyHeroMeshReady();
                    navSkipTimer = window.setTimeout(coverNavCells, 80);
                } else {
                    resetHeroMeshReady();
                }
            }
        };

        const live = () =>
            variant === 'hero' ? inView : activeRef.current;

        const resize = () => {
            const rect = wrap.getBoundingClientRect();
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dots = buildGrid(width, height, variant);
            if (staticMode) seed(true);
            else if (contact && !activeRef.current) seed(false);
            else seed(introDone);
            paintDots(
                ctx,
                dots,
                pointer,
                !staticMode && introDone,
                dpr,
                settings.restAlpha,
                skipNav && hideNavCells
            );
        };

        const step = () => {
            running = false;
            const isLive = live();
            if (!isLive) {
                if (contact) {
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                return;
            }

            if (pendingIntro) {
                seed(staticMode);
                pendingIntro = false;
            }

            let moving = pointer.active;
            const now = performance.now();
            if (!introDone && now - introT0 > (dots.maxDelay || 0) + 700) {
                finishIntro();
            }
            const allowPointer = !staticMode;

            if (!staticMode) {
                for (let i = 0; i < dots.count; i += 1) {
                    if (!introDone && now - introT0 < dots.delay[i]) {
                        dots.x[i] = dots.fromX[i];
                        dots.y[i] = dots.fromY[i];
                        moving = true;
                        continue;
                    }

                    const dropping =
                        !introDone &&
                        Math.abs(dots.y[i] - dots.restY[i]) +
                            Math.abs(dots.x[i] - dots.restX[i]) >
                            10;

                    let targetX = dots.restX[i];
                    let targetY = dots.restY[i];
                    if (allowPointer && pointer.active) {
                        const dx = pointer.x - dots.restX[i];
                        const dy = pointer.y - dots.restY[i];
                        const dist = Math.hypot(dx, dy);
                        if (dist < INFLUENCE && dist > 0.0001) {
                            const t = 1 - dist / INFLUENCE;
                            const falloff = t * t * (3 - 2 * t);
                            const pull = Math.min(dist, MAX_PULL * falloff);
                            targetX = dots.restX[i] + (dx / dist) * pull;
                            targetY = dots.restY[i] + (dy / dist) * pull;
                        }
                    }

                    const spring = dropping
                        ? settings.introSpring
                        : POINTER_SPRING;
                    const damp = dropping ? settings.introDamp : POINTER_DAMP;

                    dots.vx[i] += (targetX - dots.x[i]) * spring;
                    dots.vy[i] += (targetY - dots.y[i]) * spring;
                    if (contact && dropping && dots.y[i] < dots.restY[i]) {
                        dots.vy[i] += 0.42;
                    }
                    dots.vx[i] *= damp;
                    dots.vy[i] *= damp;
                    dots.x[i] += dots.vx[i];
                    dots.y[i] += dots.vy[i];

                    if (
                        Math.abs(dots.vx[i]) > SETTLE ||
                        Math.abs(dots.vy[i]) > SETTLE ||
                        Math.abs(dots.x[i] - dots.restX[i]) > SETTLE
                    ) {
                        moving = true;
                    }
                }

                if (!introDone && !moving) finishIntro();
            }

            paintDots(
                ctx,
                dots,
                pointer,
                allowPointer,
                dpr,
                settings.restAlpha,
                skipNav && hideNavCells
            );

            if (!staticMode && (isLive || moving)) {
                running = true;
                frame = requestAnimationFrame(step);
            }
        };

        const kick = () => {
            if (running) return;
            running = true;
            frame = requestAnimationFrame(step);
        };

        restartRef.current = () => {
            const next = activeRef.current;
            if (staticMode) {
                if (next) {
                    seed(true);
                    paintDots(
                        ctx,
                        dots,
                        pointer,
                        false,
                        dpr,
                        settings.restAlpha,
                        skipNav && hideNavCells
                    );
                } else if (contact) {
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                return;
            }
            pendingIntro = next || variant === 'hero';
            seed(false);
            if (!next) pointer.active = false;
            kick();
        };

        const onMove = (event) => {
            if (staticMode || !live()) return;
            const rect = wrap.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active =
                pointer.x >= 0 &&
                pointer.y >= 0 &&
                pointer.x <= rect.width &&
                pointer.y <= rect.height;
            kick();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                if (!inView) pointer.active = false;
                kick();
            },
            { threshold: 0.12 }
        );

        resize();
        observer.observe(wrap);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('resize', resize);
        const ro = new ResizeObserver(resize);
        ro.observe(wrap);
        kick();

        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(navSkipTimer);
            observer.disconnect();
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', resize);
            if (skipNav) resetHeroMeshReady();
        };
    }, [variant]);

    useEffect(() => {
        restartRef.current();
    }, [active]);

    return (
        <div
            ref={wrapRef}
            className='pointer-events-none absolute inset-0 z-0'
            aria-hidden
        >
            <canvas ref={canvasRef} className='h-full w-full' />
        </div>
    );
};

export default HeroDotMesh;
