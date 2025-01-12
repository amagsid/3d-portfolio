import styles from './style.module.scss';

const ParagraphAniumatedOnScroll = ({ children }) => {
    const lines = children.split('\n');

    return (
        <div className={styles.wrapper}>
            <p>
                {lines.map((line, index) => (
                    <span key={index}>{line}</span>
                ))}
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
