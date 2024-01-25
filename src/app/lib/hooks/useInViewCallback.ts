import { RefObject, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function useInViewCallback(ref: RefObject<HTMLElement>, callback: Function) {
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            callback();
        }
    }, [isInView, callback]);
}
