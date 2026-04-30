import React from 'react'

type LinkBlockProps = {
    text: string;
    url: string;
};

const LinkBlock = ({ text, url }: LinkBlockProps) => {
    return (
        <a href={url} target='_blank' rel='noopener noreferrer' className="text-blue-500 font-bold hover:underline visited:text-purple-600">
            {text}
        </a>
    )
}

export default LinkBlock