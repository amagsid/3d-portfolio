'use client';
import { useLayoutEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import ListAnimatedOnScroll from '../components/ListAnimatedOnScroll';

const Globe = dynamic(() => import('../components/Globe'), {
    ssr: false,
    loading: () => null,
});

const CoolTrick = ({ globeParentScrollRef, onInvertCursor }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(globeParentScrollRef);
    containerRef.current = globeParentScrollRef;
    const rawProgress = useMotionValue(0);
    const smoothedScroll = useSpring(rawProgress, { damping: 20, stiffness: 80 });

    useLayoutEffect(() => {
        let frame;
        let container;

        const update = () => {
            const target = sectionRef.current;
            if (!container || !target) return;

            const start = target.offsetTop - container.clientHeight * 0.15;
            const end =
                target.offsetTop +
                target.offsetHeight -
                container.clientHeight * 0.2;
            const progress = (container.scrollTop - start) / (end - start);
            rawProgress.set(Math.min(1, Math.max(0, progress)));
        };

        const bind = () => {
            container = containerRef.current?.current;
            if (!container || !sectionRef.current) {
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

    return (
        <section
            ref={sectionRef}
            className='relative z-0 w-full min-h-[170vh] bg-zinc-950'
        >
            <div className='sticky top-0 h-screen w-full overflow-hidden'>
                <Globe scrollYProgress={smoothedScroll} />
                <ListAnimatedOnScroll
                    scrollYProgress={smoothedScroll}
                    onInvertCursor={onInvertCursor}
                />
            </div>
        </section>
    );
};

export default CoolTrick;
