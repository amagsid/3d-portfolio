'use client';
import { useState } from 'react';
import Titles from './titles';

const ListAnimatedOnScroll = ({ globeParentScrollRef, scrollRef }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const data = [
        {
            title: 'Ford',
            description:
                'Working on the Next-Generation HMI Experience without no driving experience.',
            speed: 0.5,
        },
        {
            title: 'UFC',
            description:
                'Developed the Future of UFC Sports Ecosystem despite not being a sports fan.',
            speed: 0.5,
        },
        {
            title: 'Lincoln',
            description:
                'Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.',
            speed: 0.67,
        },
        {
            title: 'Royal Caribbean',
            description:
                'I was just one person on a massive team that created an entire Royal Caribbean eco-system.',
            speed: 0.8,
        },
        {
            title: 'Sleepiq',
            description:
                'Designed a 1M+ users product utilizing my best personal experience: sleeping.',
            speed: 0.8,
        },
        {
            title: 'NFL',
            description:
                'Explored the Future of Fantasy Football while being in a country where football means a total different sport.',
            speed: 0.8,
        },
    ];

    return (
        <div className='absolute w-full'>
            <Titles
                data={data}
                setSelectedProject={setSelectedProject}
                containerRef={globeParentScrollRef}
                targetRef={scrollRef}
            />
        </div>
    );
};

export default ListAnimatedOnScroll;
