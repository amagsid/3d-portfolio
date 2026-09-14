import MagneticTitle from '../MagneticTitle';
import styles from './style.module.scss';

const Descriptions = ({ selected, title, description, variant }) => {
    const isNested = variant === 'nested';

    return (
        <div className={styles.descriptions}>
            <div
                className={
                    isNested
                        ? `${styles.description} ${styles.nested}`
                        : styles.description
                }
                style={{
                    clipPath: selected ? 'inset(0 0 0)' : 'inset(50% 0 50%)',
                }}
            >
                <p style={{ pointerEvents: selected ? 'auto' : 'none' }}>
                    <MagneticTitle text={title} amount={isNested ? 4 : 6} />
                </p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Descriptions;
