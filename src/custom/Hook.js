import { useState, useEffect, useRef } from 'react';

export const useButtonClickOutside = (initialState) => {
    const [showContent, setShowContent] = useState(initialState);
    const buttonRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                contentRef.current &&
                !contentRef.current.contains(event.target)
            ) {
                setShowContent(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef, contentRef]);

    function toggleContent() {
        setShowContent(!showContent);
    }

    return [buttonRef, contentRef, toggleContent, showContent];
}

