import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { educationState , educationLatexState} from '../atom.ts';
import { eduArray } from '../config';


const Edu = () => {
    const setEduAtom = useSetRecoilState(educationLatexState);
    const [education, setEducation] = useRecoilState(educationState);
    useEffect(() => {
        const newEducation = eduArray.map((edu, index) => ({
                id: index + 1,
                uni: edu.uni,
                city: edu.city,
                degree: edu.degree,
                year: edu.year,
                selected: true
              }));
              console.log(newEducation);
              setEducation(newEducation)
              console.log("useeffect");
            }, []);

    useEffect(() => {
                if (education.length > 0) {
                  console.log("useEffect - Education state updated");
                  handleSubmit();
                }
    }, [education]);
    

    const handleSelect = (id: number) => {
        setEducation(education.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const handleChange = (id: number, key: string, value: string) => {
        setEducation(education.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        ));
    };

    const handleSubmit = () => {
        let finalLatex = `%-----------EDUCATION-----------
        \\section{Education}
        \\resumeSubHeadingListStart`
        const selectedEducation = education.filter(item => item.selected);
        console.log("filter",education,selectedEducation);
        selectedEducation.forEach(item => {
            finalLatex += `\n    \\resumeSubheading
              {${item.uni}}{${item.city}}{${item.degree}}{${item.year}}`
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`
        console.log(finalLatex);
        setEduAtom(finalLatex);
    };

    return (
        <div className='flex flex-col'>
            <div className=''>
            <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 " onClick={handleSubmit}>Submit</button>
            <div>
            {
                    education.map((item, index) => (
                        <div key={index} className=' bg-gray-200 m-5 rounded-lg flex border-b-2 p-5'>
                            <div>
                            <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={() => handleSelect(item.id)}
                                className='mr-3'
                            />
                            </div>
                          
                            <div>
                                <div className='flex mb-2'>
                                <label className='ml-2 w-1/4'>university</label>
                            <input
                                className='full-screen-input w-3/4'

                                value={item.uni}
                                onChange={(e) => handleChange(item.id, 'uni', e.target.value)}
                            />
                                </div>
                            <div className='flex mb-2'>
                            <label className='ml-2 w-1/4'>City</label>
                            <input
                                className='full-screen-input w-3/4'

                                value={item.city}
                                onChange={(e) => handleChange(item.id, 'city', e.target.value)}
                            />
                            </div>
                            <div className='flex mb-2'>
                            <label className='ml-2 w-1/4'>degree</label>
                            <input
                                className='full-screen-input w-3/4'

                                value={item.degree}
                                onChange={(e) => handleChange(item.id, 'degree', e.target.value)}
                            />
                            </div>
                           <div className='flex mb-2'>
                           <label className='ml-2 w-1/4'>year</label>
                            <input
                                className='full-screen-input w-3/4'

                                value={item.year}
                                onChange={(e) => handleChange(item.id, 'year', e.target.value)}
                            />
                           </div>
                           
                            </div>
                            
                        </div>
                    ))
                }
            </div>
                
            </div>

        </div>
    );
};

export default Edu;

