import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import Descriptions from '../Descriptions';
import {
    useScroll,
    motion,
    useTransform,
    useMotionTemplate,
    useMotionValueEvent,
} from 'framer-motion';

export default function index({ data, scrollYProgress }) {
    return (
        <div className={styles.titles}>
            {data.map((project, i) => {
                return (
                    <Title
                        key={i}
                        data={{ ...project, i }}
                        scrollYProgress={scrollYProgress}
                    />
                );
            })}
        </div>
    );
}

function Title({
    data,
    // setSelectedProject,
    scrollYProgress,
}) {
    const [selectedProject, setSelectedProject] = useState(null);
    const { title, speed, i, description } = data;
    const container = useRef(null);

    const clipProgress = useTransform(scrollYProgress, [0.15, 0.51], [100, 0]);
    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

    return (
        <div className={styles.title}>
            <div
                className={styles.wrapper}
                onMouseOver={() => {
                    setSelectedProject(i);
                }}
                onMouseLeave={() => {
                    setSelectedProject(null);
                }}
            >
                <motion.p
                    className='transition-all ease-out delay-550 pl-24'
                    style={{ clipPath: clip }}
                >
                    {title}
                </motion.p>
                <p className='pl-24'>{title}</p>
                <Descriptions
                    data={data}
                    selectedProject={selectedProject}
                    description={description}
                    title={title}
                    i={i}
                />
            </div>
        </div>
    );
}
