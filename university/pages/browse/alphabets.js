//components//
import React, { useState, useContext } from 'react';
import BrowseContext from '../../contexts/browseContext';
const Alphabet = () => {
    const { selectedLetter, setPageDetails, setSelectedLetter } = useContext(BrowseContext)

    const [isGridView, setIsGridView] = useState(false);

    const alphabets = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const onAlphaChange = e => {

        setPageDetails(prevState => ({
            ...prevState,
            number: 1

        }));
        setSelectedLetter(e)
    };

    const handleGridViewToggle = () => {

        setIsGridView(!isGridView);
    };

    return (
        <div className="flex h-[64px] px-6 bg-white items-center rounded-lg justify-between w-full">
            <div className="flex items-center space-x-4">
                {alphabets.map((letter) => (
                    <span
                        key={letter}
                        onClick={(e) => onAlphaChange(letter)}
                        className={`cursor-pointer ${selectedLetter === letter
                            ? 'text-[#F58220] font-semibold underline underline-offset-4 decoration-1 decoration-[#F58220]'
                            : 'text-black'
                            }`}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div className="ml-auto">
                <svg
                    onClick={handleGridViewToggle}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700 cursor-pointer"
                >
                    {isGridView ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
                        />
                    )}
                </svg>
            </div>
        </div>
    );
};

export default Alphabet;