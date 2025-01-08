'use client';
import { useState } from 'react';
import Titles from './titles';
import styles from './style.module.scss';

const ListAnimatedOnScroll = ({ scrollYProgress }) => {
    const data = [
        {
            title: 'Carhartt',
            description:
                'Working on the Next-Generation HMI Experience without no driving experience.',
            speed: 0.5,
        },
        {
            title: 'Booking.com',
            description:
                'Working on the Next-Generation HMI Experience without no driving experience.',
            speed: 0.5,
        },
        {
            title: 'BOL',
            description:
                'Developed the Future of UFC Sports Ecosystem despite not being a sports fan.',
            speed: 0.5,
        },
        {
            title: 'SquareSpace',
            description:
                'Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.',
            speed: 0.67,
        },
        {
            title: 'N26',
            description:
                'Designed a 1M+ users product utilizing my best personal experience: sleeping.',
            speed: 0.8,
        },
        {
            title: 'Dyson',
            description:
                'I was just one person on a massive team that created an entire Royal Caribbean eco-system.',
            speed: 0.8,
        },
    ];

    return (
        <div className='absolute w-full'>
            <Titles
                data={data}
                description={data.description}
                scrollYProgress={scrollYProgress}
            />
        </div>
    );
};

export default ListAnimatedOnScroll;
