import { useEffect, useState } from 'react';
import TypewriterEffect from 'typewriter-effect';

const Typewriter = () => {
    const [didMount, setDidMount] = useState();
    useEffect(() => {
        setDidMount(true);
    }, []);
    if (didMount) {
        return (
            <TypewriterEffect
                options={{
                    strings: [
                        'payments',
                        'donations',
                        'tips',
                        // 'gifts',
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        );
    }
    return 'payments';
};

export default Typewriter;
