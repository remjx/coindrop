import dynamic from 'next/dynamic';

const TypewriterEffect = dynamic(
    () => import('typewriter-effect'),
    { loading: () => 'payments' },
);

const Typewriter = () => (
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

export default Typewriter;
