import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Projects from '../components/Projects';
import WhyPixdevs from '../components/WhyPixdevs';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Hero />
            <Services />
            <Process />
            <Projects />
            <WhyPixdevs />
            <CTA />
        </>
    );
};

export default HomePage;
