import React from 'react';
import ParagraphAnimatedOnscroll from '../components/ParagraphAniumatedOnScroll';

const AboutMe = () => {
    const text = `Purposefully skilled
    front-end developer
    with a strong focus on
    crafting seamless digital
    experiences priotirizing user engagement `;
    return (
        <div className='px-4 sm:px-44 flex flex-col items-center'>
            {' '}
            <ParagraphAnimatedOnscroll>{text}</ParagraphAnimatedOnscroll>
            <h1> this is what I do</h1>
        </div>
    );
};

export default AboutMe;
