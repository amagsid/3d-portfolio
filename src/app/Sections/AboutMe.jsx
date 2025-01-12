import React from 'react';
import ParagraphAnimatedOnscroll from '../components/ParagraphAniumatedOnScroll';

const AboutMe = ({ globeParentScrollRef }) => {
    const text = `I'm a purposefully skilled front-end
    developer with a strong focus on
    crafting seamless digital
    experiences and user engagement`;
    return (
        <div className='section-container flex flex-col justify-start items-start'>
            {' '}
            <ParagraphAnimatedOnscroll
                globeParentScrollRef={globeParentScrollRef}
            >
                {text}
            </ParagraphAnimatedOnscroll>
            <h1> this is what I do</h1>
        </div>
    );
};

export default AboutMe;
