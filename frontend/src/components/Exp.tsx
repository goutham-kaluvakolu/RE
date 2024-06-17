import  { useEffect, useState } from 'react';
import { expArray } from '../config';
import { useRecoilState } from 'recoil';
import { experienceState,experienceLatexState } from '../atom';

const Exp = () => { 
    const [experienceAtom, setExperienceAtom] = useRecoilState(experienceLatexState);
    const [experience, setExperience] = useRecoilState(experienceState);

    const handleSubmit = () => {
        let finalLatex = `%-----------EXPERIENCE-----------
        \\section{Experience}
        \\resumeSubHeadingListStart`;
        const selectedExperience = experience.filter(item => item.selected);
        selectedExperience.forEach(item => {
            console.log(item);
            finalLatex += `\n    \\resumeSubheading
              {${item.role}}{${item.years}}{${item.company}}{${item.loc}}
              \n    \\resumeItemListStart
              `;
             
            item.points.filter(point => point.selected).forEach(point => {
                finalLatex += `\n      \\resumeItem {${point.text}}`;
            });

            finalLatex += `\n    \\resumeItemListEnd`;
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`;
        console.log(finalLatex);
        setExperienceAtom(finalLatex);
    };
    
       useEffect(() => {
          const newExperience = expArray.map((exp, index) => ({
                    id: index + 1,
                   role: exp.role,
                   company: exp.company,
                    years: exp.years,
                    loc: exp.loc,
                    points: exp.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
                   selected: true
                }));
                console.log(newExperience);
                setExperience(newExperience)
        handleSubmit();
        
            }, []);

        

    
        

    const handleSelect = (id) => {
        setExperience(experience.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const handleChange = (id, key, value) => {
        setExperience(experience.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        ));
    };

    const handlePointChange = (expId, pointId, value) => {
        setExperience(experience.map(item =>
            item.id === expId ? {
                ...item,
                points: item.points.map(point =>
                    point.id === pointId ? { ...point, selected: !point.selected } : point
                )
            } : item
        ));
    };
    const handlePointInputChange = (expId, pointId, value) => {
        setExperience(experience.map(item =>
            item.id === expId ? {
                ...item,
                points: item.points.map(point =>
                    point.id === pointId ? { ...point, text:value } : point
                )
            } : item
        ));
    };



    return (
        <div>
            <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>

            {
                experience.map((item, index) => (
                    <div key={index} className='flex justify-between border-b-2 p-4 bg-slate-300 m-2 rounded-lg'>
                        <div className='m-4'>
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => handleSelect(item.id)}
                        />
                        </div>
                    <div>
                        <div>
                        <input
                            className='full-screen-input'
                            value={item.role}
                            onChange={(e) => handleChange(item.id, 'role', e.target.value)}
                        />
                        <input
                            className='full-screen-input'
                            value={item.years}
                            onChange={(e) => handleChange(item.id, 'year', e.target.value)}
                        />
                        <input
                            className='full-screen-input'
                            value={item.company}
                            onChange={(e) => handleChange(item.id, 'company', e.target.value)}
                        />
                        <input
                            className='full-screen-input'
                            value={item.loc}
                            onChange={(e) => handleChange(item.id, 'loc', e.target.value)}
                        />
                        </div>
                        <div>
                        {item.points.map(point => (
                            <div key={point.id} className='m-8'>
                                <input
                                    type="checkbox"
                                    checked={point.selected}
                                    onChange={() => handlePointChange(item.id, point.id, point.selected)}
                                />
                                <input
                            className='full-screen-input '
                                    value={point.text}
                                    onChange={(e) => handlePointInputChange(item.id, point.id, e.target.value)}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                        
                        
                    </div>
                ))
            }

        </div>
    );
};

export default Exp;

