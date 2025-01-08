import styles from './style.module.scss';

const Descriptions = ({ data, selectedProject, title, description, i }) => {
    const crop = (string, maxLength) => {
        return string.substring(0, maxLength);
    };

    return (
        <div className={styles.descriptions}>
            <div
                key={i}
                className={styles.description}
                style={{
                    clipPath:
                        selectedProject == i
                            ? 'inset(0 0 0)'
                            : 'inset(50% 0 50%',
                }}
            >
                {/* <p>{crop(title, 9)}</p> */}
                <p className='pl-10'>{title}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Descriptions;
