// src/Projects.jsx
import  { useEffect } from 'react';
import { projectsArray } from '../config';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { projectsState, projectsLatexState } from '../atom';

const Projects = () => {
    const setProjectsAtom = useSetRecoilState(projectsLatexState);
    const [projects, setProjects] = useRecoilState(projectsState);

    
    const handleSubmit = () => {
        let finalLatex = `%-----------PROJECTS-----------
        \\section{Projects}
        \\resumeSubHeadingListStart`;
        const selectedProjects = projects.filter(proj => proj.selected);
        selectedProjects.forEach(proj => {
            finalLatex += `\n    \\resumeProjectHeading
            {\\textbf{${proj.name}} $|$ \\emph{${proj.tech}}}
              {${proj.years}} \n    \\resumeItemListStart`;
            proj.points.filter(point => point.selected).forEach(point => {
                finalLatex += `\n      \\resumeItem {${point.text}}`;
            });
            finalLatex += `\n    \\resumeItemListEnd`;
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`;
        console.log(finalLatex);
        setProjectsAtom(finalLatex);
    };
    // @tsignore

    useEffect(() => {
        // @ts-ignore: Ignore type error for the example array
        const newProjects = projectsArray.map((proj, index) => ({
            id: index + 1,
            // @ts-ignore: Ignore type error for the example array
            name: proj.name,
            // @ts-ignore: Ignore type error for the example array
            tech: proj.tech.join(', '),
            // @ts-ignore: Ignore type error for the example array
            years: proj.years,
            // @ts-ignore: Ignore type error for the example array
            points: proj.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
            selected: true
        }));

        setProjects(newProjects);

    }, []);
    
    useEffect(() => {
        if (projects.length > 0) {
          console.log("useEffect - Education state updated");
          handleSubmit();
        }
}, [projects]);



    const handleSelect = (id: number) => {
        setProjects(projects.map(proj =>
            proj.id === id ? { ...proj, selected: !proj.selected } : proj
        ));
    };

    const handleChange = (id: number, key: string, value: string) => {
        setProjects(projects.map(proj =>
            proj.id === id ? { ...proj, [key]: value } : proj
        ));
    };

    const handlePointChange = (projId: number, pointId: number, value: string) => {
        setProjects(projects.map(proj =>
            proj.id === projId ? {
                ...proj,
                points: proj.points.map(point =>
                    point.id === pointId ? { ...point, text: value } : point
                )
            } : proj
        ));
    };

    const handlePointSelect = (projId: number, pointId: number) => {
        setProjects(projects.map(proj =>
            proj.id === projId ? {
                ...proj,
                points: proj.points.map(point =>
                    point.id === pointId ? { ...point, selected: !point.selected } : point
                )
            } : proj
        ));
    };

    return (
        <div >
            <button className="m-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:shadow-lg rounded" type="submit" onClick={handleSubmit} >
                Submit
            </button>
            <div>
                {
                    projects.map((proj, index) => (
                        <div key={index} className="flex m-5 border-b-2 p-4 bg-slate-300 rounded-lg">
                            <div className='m-4'>
                                <input
                                    type="checkbox"
                                    checked={proj.selected}
                                    onChange={() => handleSelect(proj.id)}
                                />
                            </div>
                            <div className="w-full">
                                <div>
                                    <input
                                        value={proj.name}
                                        onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                                        placeholder="Project Name"
                                        className=" full-screen-input block w-full mb-2"
                                    />
                                    <input
                                        value={proj.tech}
                                        onChange={(e) => handleChange(proj.id, 'tech', e.target.value)}
                                        placeholder="Technologies (comma separated)"
                                        className="full-screen-input block w-full mb-2"
                                    />
                                    <input
                                        value={proj.years}
                                        onChange={(e) => handleChange(proj.id, 'years', e.target.value)}
                                        placeholder="Years"
                                        className="full-screen-input block w-full mb-2"
                                    />
                                </div>
                                <div>
                                    {proj.points.map(point => (
                                        <div key={point.id} className="flex items-center m-5 ">
                                            <input
                                                type="checkbox"
                                                checked={point.selected}
                                                onChange={() => handlePointSelect(proj.id, point.id)}
                                            />
                                            <input
                                                value={point.text}
                                                onChange={(e) => handlePointChange(proj.id, point.id, e.target.value)}
                                                className="full-screen-input ml-2 w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default Projects;
