import React from 'react';

// pode se utilizar a props, e logo acessar com props.title
export default function Header({ title, children, }) {
    return (
        <header>
            <h1>{title}</h1>
            <h2>{children}</h2>
        </header>
    );
}
