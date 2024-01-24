'use client';

import { useScroll, useTransform } from 'framer-motion';

export default function useParallaxScroll(ref: React.MutableRefObject<HTMLDivElement | null>) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const sm = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -900]);

    return {
        sm,
        md,
        lg
    };
}
