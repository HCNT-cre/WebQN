import { useState, useEffect, useRef } from 'react';

export const useButtonClickOutside = (initialState) => {
    const [showContent, setShowContent] = useState(initialState);
    const buttonRef = useRef(null);
    const contentRef = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            let contentRefContains = false;
            for (let i = 0; i < contentRef.current.length; i++) {
                if (contentRef.current[i] === undefined || contentRef.current[i] === null) continue;

                if (typeof(contentRef.current[i].contains) === "function") {
                    if (contentRef.current[i].contains(event.target)) {
                        contentRefContains = true
                    }
                }
            }   
            
            console.log(contentRef.current[0])
            if (buttonRef.current && !buttonRef.current.contains(event.target) && !contentRefContains) {
                // if(contentRef.current[0] === undefined || contentRef.current[0] === null){
                    console.log("hide")
                    setShowContent(false);
                // }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef, contentRef]);

    const toggleContent = () => {
        setShowContent(!showContent);
    }

    return [buttonRef, contentRef, toggleContent, showContent];
}

