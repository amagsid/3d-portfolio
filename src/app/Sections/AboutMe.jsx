'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParagraphAnimatedOnscroll from '../components/ParagraphAniumatedOnScroll';
import styles from './AboutMe.module.scss';

const SHOW_PORTRAIT = false;

const AboutMe = ({ globeParentScrollRef, onFlashlight }) => {
    const sectionRef = useRef(null);
    const progressValue = useMotionValue(0);
    const progress = useSpring(progressValue, {
        stiffness: 48,
        damping: 22,
        mass: 0.45,
    });
    const scaleY = useTransform(progress, [0, 1], [0, 1]);
    const clipPath = useTransform(
        progress,
        [0, 0.45],
        ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
    );
    const portraitOpacity = useTransform(
        progress,
        [0, 0.08, 0.5, 0.9, 1],
        [0, 0.4, 1, 1, 0.78]
    );
    const portraitY = useTransform(progress, [0, 1], [40, -24]);
    const kickerPortraitOpacity = useTransform(
        progress,
        [0, 0.18, 0.45],
        [0.22, 0.72, 1]
    );

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.sticky}>
                {SHOW_PORTRAIT ? (
                    <div className={styles.portraitWrap} aria-hidden>
                        <motion.div
                            className={styles.portrait}
                            style={{
                                clipPath,
                                opacity: portraitOpacity,
                                y: portraitY,
                            }}
                        >
                            <Image
                                src='/about-portrait.jpg'
                                alt=''
                                fill
                                sizes='(max-width: 768px) 0px, min(28vw, 42vh)'
                                className={styles.portraitImage}
                            />
                            <span className={styles.portraitTone} />
                        </motion.div>
                    </div>
                ) : null}
                <div className={styles.progress} aria-hidden>
                    <motion.div
                        className={styles.progressFill}
                        style={{ scaleY }}
                    />
                </div>
                <p className={styles.kicker}>
                    <span className={styles.kickerLine} />
                    About
                    {SHOW_PORTRAIT ? (
                        <motion.span
                            className={styles.kickerPortrait}
                            style={{ opacity: kickerPortraitOpacity }}
                            aria-hidden
                        >
                            <Image
                                src='/about-portrait.jpg'
                                alt=''
                                fill
                                sizes='72px'
                                className={styles.portraitImage}
                            />
                            <span className={styles.portraitTone} />
                        </motion.span>
                    ) : null}
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
