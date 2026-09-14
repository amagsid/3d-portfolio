'use client';
import Titles from './Titles';

const ListAnimatedOnScroll = ({ scrollYProgress, onInvertCursor }) => {
    const data = [
        {
            title: 'Carhartt',
            tag: 'Now',
            description:
                "Maintaining Carhartt's global digital interfaces across the U.S and EMEA so that hard working people can have a seamless UX",
            href: 'https://www.carhartt.com',
        },
        {
            title: 'Ambassadors',
            tag: 'Agency',
            description:
                'Helped Brand automate and scale up their creative content production process.',
            href: 'https://www.ambassadors.com',
            clients: [
                {
                    title: 'Booking.com',
                    description:
                        'Helped Booking template and scale up its marketing material to hundreds of markets worldwide',
                    href: 'https://www.booking.com',
                },
                {
                    title: 'BOL',
                    description:
                        'Developed the Future of UFC Sports Ecosystem despite not being a sports fan.',
                    href: 'https://www.bol.com',
                },
                {
                    title: 'Squarespace',
                    description:
                        'Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.',
                    href: 'https://www.squarespace.com',
                },
            ],
        },
        {
            title: 'Project V',
            tag: 'Previous',
            description:
                'Where my UI/UX design journey began and my skills were put to the test.',
            href: 'https://www.projectv.com',
        },
        {
            title: 'Wall-O',
            tag: 'Personal',
            description:
                'An dashboard tool to help event mangers manage events and merket then through theirattendees.',
        },
    ];

    return (
        <div className='absolute inset-0 z-[2]'>
            <Titles
                data={data}
                scrollYProgress={scrollYProgress}
                onInvertCursor={onInvertCursor}
            />
        </div>
    );
};

export default ListAnimatedOnScroll;
