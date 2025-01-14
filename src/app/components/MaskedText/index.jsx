import styles from './style.module.scss';

const MasdkedText = ({ children }) => {
    return (
        <div className={styles.maskedWrapper}>
            <p> {children} </p>
        </div>
    );
};

export default MasdkedText;
