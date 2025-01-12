import styles from './style.module.scss';
import { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
    useSpring,
} from 'framer-motion';

const ParagraphAniumatedOnScroll = ({ children, globeParentScrollRef }) => {
    const lines = children.split('\n');
    const scrollRef = useRef(null); // Ref for CoolTrick component itself

    const { scrollYProgress } = useScroll({
        container: globeParentScrollRef, // Track scroll within parent container
        target: scrollRef, // Track the scroll progress of the CoolTrick component
        offset: ['start end', 'end start'], // When CoolTrick enters and exits the view
    });

    // Smoothen the scroll progress using useSpring
    const smoothScrollYProgress = useSpring(scrollYProgress, {
        stiffness: 60, // Controls the resistance (smoothness)
        damping: 20, // Controls how fast the effect settles
        mass: 0.5, // Adjust the momentum of the spring
    });

    return (
        <div ref={scrollRef} className={styles.wrapper}>
            <p>
                {lines.map((line, index) => {
                    // Create a unique progress range for each line
                    const start = 0.12 + index * 0.115; // Adjust the offset for each line
                    const end = start + 0.14; // Duration of each line animation
                    const clipProgress = useTransform(
                        smoothScrollYProgress,
                        [start, end],
                        [100, 0]
                    );
                    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;
                    return (
                        <motion.span
                            style={{ clipPath: clip }}
                            key={index}
                            // className=' transition-all ease-in-out'
                        >
                            {line}
                        </motion.span>
                    );
                })}
            </p>
            <p>
                {lines.map((line, index) => (
                    <span key={index}>{line}</span>
                ))}
            </p>
        </div>
    );
};

export default ParagraphAniumatedOnScroll;
