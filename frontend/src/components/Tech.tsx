import React, { useEffect, useState } from 'react';
import { techObject } from '../config'; // Importing the techObject from config file
import { techLatexState } from '../atom';
import { useSetRecoilState } from 'recoil';

type TechObject = {
    [category: string]: string[];
};

type TechCategory = {
    name: string;
    checked: boolean;
};

type ProcessedTechObject = {
    [category: string]: TechCategory[];
};

const preprocessTechObject = (techObject: TechObject): ProcessedTechObject => {
    const processedObject: ProcessedTechObject = {};
    Object.keys(techObject).forEach((category) => {
        processedObject[category] = techObject[category].map((tech) => ({
            name: tech.toString(), // Convert tech to string here
            checked: true
        }));
    });
    return processedObject;
};

const TechConfigEditor: React.FC = () => {
    const setTechLatexAtom = useSetRecoilState(techLatexState);
    const allTechnologies = techObject['all'] || [];
    const [technologies, setTechnologies] = useState<ProcessedTechObject>(preprocessTechObject(techObject));
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('languages');

    useEffect(() => {
        handleSubmit();
    }, []); // This effect runs only once, similar to componentDidMount

    const handleCheckboxChange = (category: string, index: number) => {
        const newTechnologies = { ...technologies };
        newTechnologies[category][index].checked = !newTechnologies[category][index].checked;
        setTechnologies(newTechnologies);
    };

    const handleInputChange = (category: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTechnologies = { ...technologies };
        newTechnologies[category][index].name = event.target.value;
        setTechnologies(newTechnologies);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (techName: string) => {
        const newTechnologies = { ...technologies };
        if (selectedCategory) {
            newTechnologies[selectedCategory] = [
                ...newTechnologies[selectedCategory],
                { name: techName, checked: true }
            ];
            setTechnologies(newTechnologies);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setDropdown(!dropdown);
    };

    const handleSubmit = () => {
        let finalLatex = `%-----------PROGRAMMING SKILLS-----------
        \\section{Technical Skills}
        \\begin{itemize}[leftmargin=0.15in, label={}]
        \\small{
        \\item{`;

        Object.keys(technologies).forEach((category) => {
            if (category === 'all') return;
            finalLatex += `\n\\textbf{${category}}{: `;
            technologies[category].filter((tech) => tech.checked).forEach((tech) => {
                finalLatex += ` ${tech.name}, `;
            });
            finalLatex += `} \\\\`;
        });
        finalLatex += ` }}
        \\end{itemize}`;
        
        setTechLatexAtom(finalLatex);
    };

    return (
        <div className=''>
            <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:shadow-lg rounded" onClick={handleSubmit}>Submit</button>
            <div className='flex bg-slate-300'>
                {/* Dropdown */}
                <div className='m-5'>
                    <button id="dropdownDefaultButton"
                        onClick={() => setDropdown(!dropdown)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">{selectedCategory}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div id="dropdown" className={`${dropdown ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg`}>
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                            {Object.keys(techObject).map((category) => (
                                <li key={category}>
                                    <div className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleCategorySelect(category)}>{category}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Search */}
                <div className='m-5'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <ul>
                        {searchTerm.length > 0 &&
                            allTechnologies
                                .filter((tech) => tech.toLowerCase() === searchTerm.toLowerCase() || tech.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((tech) => (
                                    <li
                                        key={tech}
                                        onClick={() => handleSelect(tech)}
                                    >
                                        {tech}
                                    </li>
                                ))}
                    </ul>
                </div>
            </div>
            <div className='flex bg-slate-300'>
                {Object.keys(techObject).map((category) => (
                    <div key={category} className="">
                        <h3 className="text-xl font-bold bg-gray-200 p-2 rounded-md flex items-center justify-center">
                            {category}
                        </h3>
                        <div className='flex flex-col'>
                            {technologies[category].map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border border-gray-300 p-2 rounded-md"
                                >
                                    <input
                                        type="checkbox"
                                        checked={tech.checked || false}
                                        onChange={() => handleCheckboxChange(category, index)}
                                        className="mr-2" // Add margin for better spacing
                                    />
                                    <input
                                        type="text"
                                        value={tech.name}
                                        onChange={(e) => handleInputChange(category, index, e)}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechConfigEditor;
