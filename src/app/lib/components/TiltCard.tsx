'use client';

import { CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { color } from '../types';

export default function TiltCard({ children, className, style, backgroundColor, xInputRange, yInputRange }: {
    children: React.ReactNode,
    className?: string,
    style?: CSSProperties,
    backgroundColor?: color,
    xInputRange?: [number, number],
    yInputRange?: [number, number]
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, (xInputRange ?? [-0.5, 0.5]), ['17.5deg', '-17.5deg']);
    const rotateY = useTransform(mouseXSpring, (yInputRange ?? [-0.5, 0.5]), ['-17.5deg', '17.5deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();

        const height = rect.height;
        const width = rect.width;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPercent = mouseX / width - 0.5;
        const yPercent = mouseY / height - 0.5;

        x.set(xPercent);
        y.set(yPercent);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            className={(className + ' p-1')}
            style={{
                ...style,
                rotateX,
                rotateY,
                backgroundColor,
                transformStyle: 'preserve-3d',
                transition: 'ease-in-out 0.3s background-color',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={(className) + ' h-full'}
                style={{
                    width: '100%', // setting this inline to ensure override className - visually, it needs to fill out the full width
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d',
                    display: 'inherit',
                    flex: 'inherit',
                    flexDirection: 'inherit',
                    justifyContent: 'inherit',
                    alignItems: 'inherit',
                    borderRadius: 'inherit'
                }}
            >
                {children}
            </div>
        </motion.div>
    )
}