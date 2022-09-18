import { FC } from 'react';

const Title: FC<{ children: React.ReactNode }> = ({ children }) => (
    <h1
        style={{
            fontFamily: "'Fira Sans', 'Segoe UI', Segoe-UI, Helvetica, Arial, sans-serif",
        }}
    >
        {children}
    </h1>
);

export default Title;
