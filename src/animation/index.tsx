export const CONTAINER = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.08 }
    }
} as const;

export const ITEM_ANIMATION_UP = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' }, filter: 'blur(0px)' }
} as const;

export const ITEM_ANIMATION_DOWN = {
    hidden: { opacity: 0, y: -10, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' }, filter: 'blur(0px)' }
} as const;