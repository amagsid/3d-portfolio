'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParagraphAnimatedOnscroll from '../components/ParagraphAniumatedOnScroll';
import styles from './AboutMe.module.scss';

const AboutMe = ({ globeParentScrollRef, onFlashlight }) => {
    const sectionRef = useRef(null);
    const progressValue = useMotionValue(0);
    const progress = useSpring(progressValue, {
        stiffness: 48,
        damping: 22,
        mass: 0.45,
    });
    const scaleY = useTransform(progress, [0, 1], [0, 1]);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.sticky}>
                <div className={styles.progress} aria-hidden>
                    <motion.div
                        className={styles.progressFill}
                        style={{ scaleY }}
                    />
                </div>
                <p className={styles.kicker}>
                    <span className={styles.kickerLine} />
                    About
                </p>
                <ParagraphAnimatedOnscroll
                    globeParentScrollRef={globeParentScrollRef}
                    trackRef={sectionRef}
                    highlightWords={[
                        'purposefully-skilled',
                        'seamless',
                        'user engagement',
                    ]}
                    progressValue={progressValue}
                    onFlashlight={onFlashlight}
                >
                     a purposefully-skilled frontend developer with a
                    strong focus on crafting seamless digital experiences and
                    user engagement
                </ParagraphAnimatedOnscroll>
                <p className={styles.skills}>Skills and technologies</p>
            </div>
        </section>
    );
};

export default AboutMe;
