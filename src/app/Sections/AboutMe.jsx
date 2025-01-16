import React from 'react';
import ParagraphAnimatedOnscroll from '../components/ParagraphAniumatedOnScroll';

const AboutMe = ({ globeParentScrollRef, x, y }) => {
    const text = `I'm a purposefully-skilled frontend
    developer with a strong focus on
    crafting seamless digital
    experiences and user engagement`;
    return (
        <div className='section-container flex flex-col justify-start items-start'>
            {' '}
            <ParagraphAnimatedOnscroll
                x={x}
                y={y}
                globeParentScrollRef={globeParentScrollRef}
                highlightWords={[
                    'purposefully-skilled',
                    'seamless',
                    'user engagement',
                ]}
            >
                {text}
            </ParagraphAnimatedOnscroll>
            <h1> Skills and technologies</h1>
        </div>
    );
};

export default AboutMe;
