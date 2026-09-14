'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import MagneticTitle from '../components/ListAnimatedOnScroll/MagneticTitle';
import styles from './Contact.module.scss';

const FloatingShape = dynamic(() => import('../components/FloatingShape'), {
    ssr: false,
});

const EMAIL = 'hello@ahmadsaeed.com';

const pullFromStage = (emailEl, stageEl) => {
    if (!emailEl || !stageEl) return null;
    const email = emailEl.getBoundingClientRect();
    const stage = stageEl.getBoundingClientRect();
    return {
        x:
            (email.left + email.width / 2 - (stage.left + stage.width / 2)) /
            Math.max(stage.width, 1),
        y:
            (email.top + email.height / 2 - (stage.top + stage.height / 2)) /
            Math.max(stage.height, 1),
    };
};

const Contact = ({ globeParentScrollRef }) => {
    const sectionRef = useRef(null);
    const emailRef = useRef(null);
    const stageRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [excited, setExcited] = useState(false);
    const [attract, setAttract] = useState(null);
    const [copied, setCopied] = useState(false);
    const copiedTimer = useRef(null);

    const aimAtEmail = () => {
        setAttract(pullFromStage(emailRef.current, stageRef.current));
        setExcited(true);
    };

    const releaseAim = () => {
        setAttract(null);
        setExcited(false);
    };

    useEffect(() => () => clearTimeout(copiedTimer.current), []);

    useEffect(() => {
        let frame;
        let observer;

        const bind = () => {
            const target = sectionRef.current;
            const root = globeParentScrollRef?.current;
            if (!target || !root) {
                frame = requestAnimationFrame(bind);
                return;
            }

            observer = new IntersectionObserver(
                ([entry]) => setInView(entry.isIntersecting),
                { root, threshold: 0.38 }
            );
            observer.observe(target);
        };

        bind();

        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
        };
    }, [globeParentScrollRef]);

    const copyEmail = async (event) => {
        event.preventDefault();
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.copy}>
                <p className={styles.kicker}>
                    <span className={styles.kickerLine} />
                    Contact
                </p>
                <p className={styles.line}>A brief is enough</p>
                <a
                    ref={emailRef}
                    className={styles.email}
                    href={`mailto:${EMAIL}`}
                    onClick={copyEmail}
                    onMouseEnter={aimAtEmail}
                    onMouseLeave={releaseAim}
                    onFocus={aimAtEmail}
                    onBlur={releaseAim}
                >
                    <MagneticTitle text={EMAIL} amount={8} />
                    {copied ? (
                        <span className={styles.copied}>copied</span>
                    ) : null}
                </a>
                <nav className={styles.socials} aria-label='Social'>
                    <a
                        className={styles.social}
                        href='https://www.linkedin.com/in/ahmadsaeed'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        LinkedIn
                    </a>
                    <a
                        className={styles.social}
                        href='https://github.com/ahmadsaeed'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        GitHub
                    </a>
                </nav>
            </div>
            <div ref={stageRef} className={styles.stage} aria-hidden>
                <FloatingShape
                    variant='contact'
                    excited={excited}
                    inView={inView}
                    attract={attract}
                />
            </div>
            <footer className={styles.footer}>
                <span>Ahmad Saeed</span>
                <span>© 2026</span>
                <span>Worldwide</span>
            </footer>
        </section>
    );
};

export default Contact;
