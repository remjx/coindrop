import { FC } from 'react';

const Paragraph: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        style={{
            fontSize: "14px",
            color: "gray",
            marginTop: "1rem",
        }}
    >
        {children}
    </div>
);

export default Paragraph;
