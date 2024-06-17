import  { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../links';
import { useRecoilState, useRecoilValue } from 'recoil';
import { experienceState, projectsState, techState, experienceLatexState, educationLatexState, projectsLatexState, techLatexState } from '../atom';
import { latexTex } from '../config';
const JobDescription = () => {
  const [expArray, setExpArray] = useRecoilState(experienceState);
  const [projectsArray, setProjectsArray] = useRecoilState(projectsState);
  const techArray  = useRecoilValue(techState);
  const [explatex, setExpLatex] = useRecoilState(experienceLatexState);
  const [educationLatex, setEducationLatex] = useRecoilState(educationLatexState);
  const [projectsLatex, setProjectsLatex] = useRecoilState(projectsLatexState);
  const [techLatex, setTechLatex] = useRecoilState(techLatexState);
  const [jobDescription, setJobDescription] = useState('');
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState('');
  const [copyLatex, setCopyLatex] = useState("");

  const handleInputChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleAIClick = async () => {
    try {
      const response = await axios.post(backendUrl, {
        description: jobDescription,
        resume: {
          exp: expArray.map(exp => ({
            role: exp.role,
            company: exp.company,
            years: exp.years,
            loc: exp.loc,
            points: exp.points
          })),
          projectsArray: projectsArray.map(proj => ({
            name: proj.name,
            tech: proj.tech,
            years: proj.years,
            points: proj.points
          })),
          techArray
        }
      });
      setAiGeneratedDescription(response.data.generatedDescription);
      // generatedDescription is the AI-generated description it has expArray ,educationArray, projectsArray, techArray
      // fetch all arrays and set them in atom
      const res = response.data.generatedDescription;
      const newExp = res.expArray.map((exp, index) => ({
        id: index + 1,
        role: exp.role,
        company: exp.company,
        years: exp.years,
        loc: exp.loc,
        points: exp.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      setExpArray(newExp);
      const newProjects = res.projectsArray.map((proj, index) => ({
        id: index + 1,
        name: proj.name,
        tech: proj.tech,
        years: proj.years,
        points: proj.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      console.log(newProjects);
      // setEducationArray(res.educationArray);
      setProjectsArray(newProjects);
      // setTechArray(res.techArray);
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleAIClickForLatex = async () => {
    const templatex = latexTex
    try {
      let body = templatex + educationLatex + explatex + projectsLatex + techLatex + `
       \\end{document}`;
      console.log(body);
      setCopyLatex(body);
      // navigator.clipboard.writeText(body)
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col w-full max-w-xl m-5 bg-gray-100 rounded-lg shadow-md p-5 '>
        <div className='w-full '>
          <textarea
            value={jobDescription}
            onChange={handleInputChange}
            placeholder="Enter job description here"
            rows="10"
            cols="50"
            className='w-full text-xl font-bold p-2 m-2 bg-slate-300 rounded resize-none'
          />

          {aiGeneratedDescription && (
            <div className='mt-5'>
              <h2 className='text-2xl font-bold'>AI Generated Description</h2>
              {/* <p>{aiGeneratedDescription}</p> */}
            </div>
          )}
        </div>

        <div className='flex flex-col mx-auto items-center justify-center bg-slate-300 w-full p-5'>
          <div className='flex w-full'>
            <button className='text-xl font-bold m-2 bg-blue-500 p-1 rounded w-1/3' onClick={handleAIClick}>AI</button>
            <button className='text-xl font-bold m-2 bg-blue-500 p-1 rounded w-2/3' onClick={handleAIClickForLatex}>gen latex</button>
          </div>
          <div className='text-3xl font-bold text-center bg-green-500 p-2 rounded w-full' onClick={() => navigator.clipboard.writeText(copyLatex)}>copy</div>
        </div>

      </div>
    </div>
  );
};

export default JobDescription;

