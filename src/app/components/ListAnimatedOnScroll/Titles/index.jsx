import React, { useRef } from 'react';
import styles from './style.module.scss';
import {
    useScroll,
    motion,
    useTransform,
    useMotionTemplate,
    useMotionValueEvent,
} from 'framer-motion';

export default function index({ data, setSelectedProject }) {
    return (
        <div className={styles.titles}>
            {data.map((project, i) => {
                return (
                    <Title
                        key={i}
                        data={{ ...project, i }}
                        setSelectedProject={setSelectedProject}
                    />
                );
            })}
        </div>
    );
}

function Title({ data, setSelectedProject, globeParentScrollRef, scrollRef }) {
    const { title, speed, i } = data;
    const container = useRef(null);

    // const { scrollYProgress } = useScroll({
    //     container: globeParentScrollRef, // Track scroll within parent container
    //     target: container,
    //     offset: ['start end', `end start`],
    // });

    const { scrollYProgress } = useScroll({
        container: globeParentScrollRef,
        target: container, // The element to track
        offset: ['start end', `${25 / speed}vw end`],
    });

    // const { scrollYProgress } = useScroll({
    //     container: globeParentScrollRef, // Track scroll within parent container
    //     target: scrollRef, // Track the scroll progress of the CoolTrick component
    //     offset: ['start end', `${25 / speed}vw end`],
    // });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        console.log('Scroll progressssss:', latest);
    });

    const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

    return (
        <div ref={container} className={styles.title}>
            <div
                className={styles.wrapper}
                onMouseOver={() => {
                    setSelectedProject(i);
                }}
                onMouseLeave={() => {
                    setSelectedProject(null);
                }}
            >
                <motion.p style={{ clipPath: clip }}>{title}</motion.p>
                <p>{title}</p>
            </div>
        </div>
    );
}
