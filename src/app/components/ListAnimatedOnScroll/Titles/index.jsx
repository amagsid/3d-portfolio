'use client';
import { useState } from 'react';
import { motion, useTransform, useMotionTemplate } from 'framer-motion';
import Descriptions from '../Descriptions';
import MagneticTitle from '../MagneticTitle';
import styles from './style.module.scss';

export default function Titles({ data, scrollYProgress, onInvertCursor }) {
    return (
        <ul className={styles.titles}>
            {data.map((project) => (
                <li
                    key={project.title}
                    className={
                        project.clients
                            ? `${styles.primary} ${styles.withClients}`
                            : styles.primary
                    }
                >
                    <TitleRow
                        title={project.title}
                        description={project.description}
                        href={project.href}
                        tag={project.tag}
                        extraTag={!project.href ? 'WIP' : undefined}
                        variant='primary'
                        scrollYProgress={scrollYProgress}
                        onInvertCursor={onInvertCursor}
                    />
                    {project.clients ? (
                        <ul className={styles.clients}>
                            {project.clients.map((client) => (
                                <li key={client.title} className={styles.client}>
                                    <TitleRow
                                        title={client.title}
                                        description={client.description}
                                        href={client.href}
                                        variant='nested'
                                        scrollYProgress={scrollYProgress}
                                        onInvertCursor={onInvertCursor}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </li>
            ))}
        </ul>
    );
}

function TitleRow({
    title,
    description,
    href,
    tag,
    extraTag,
    variant,
    scrollYProgress,
    onInvertCursor,
}) {
    const [hovered, setHovered] = useState(false);
    const isPrimary = variant === 'primary';
    const clipProgress = useTransform(scrollYProgress, [0.15, 0.51], [100, 0]);
    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

    const sharedProps = {
        className: `${styles.row} ${
            isPrimary ? styles.rowPrimary : styles.rowNested
        } ${href ? styles.clickable : styles.static}`,
        onMouseOver: () => {
            setHovered(true);
            onInvertCursor?.(true);
        },
        onMouseLeave: () => {
            setHovered(false);
            onInvertCursor?.(false);
        },
    };

    const inner = (
        <>
            <div className={styles.wrapper}>
                {isPrimary ? (
                    <>
                        <motion.p style={{ clipPath: clip }}>
                            <MagneticTitle text={title} />
                        </motion.p>
                        <p>
                            <MagneticTitle text={title} />
                        </p>
                    </>
                ) : (
                    <p>
                        <MagneticTitle text={title} amount={4} />
                    </p>
                )}
            </div>
            {tag || extraTag ? (
                <span className={styles.tags}>
                    {tag ? (
                        <span
                            className={
                                tag === 'Now' ? styles.tagNow : styles.tag
                            }
                        >
                            {tag}
                        </span>
                    ) : null}
                    {extraTag ? (
                        <span className={styles.tagWip}>{extraTag}</span>
                    ) : null}
                </span>
            ) : null}
            <Descriptions
                selected={hovered}
                title={title}
                description={description}
                variant={variant}
            />
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${title} (opens in a new tab)`}
                {...sharedProps}
            >
                {inner}
            </a>
        );
    }

    return <div {...sharedProps}>{inner}</div>;
}
