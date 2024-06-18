import  { SetStateAction, useState } from 'react';
import axios from 'axios';
import { backendUrl, backendUrlGenKey } from '../links';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { experienceState, projectsState, experienceLatexState, educationLatexState, projectsLatexState, techLatexState, keywordsAtom } from '../atom';
import { latexTex } from '../config';

const JobDescription = () => {
  const [expArray, setExpArray] = useRecoilState(experienceState);
  const [projectsArray, setProjectsArray] = useRecoilState(projectsState);
  const explatex = useRecoilValue(experienceLatexState);
  const educationLatex = useRecoilValue(educationLatexState);
  const projectsLatex = useRecoilValue(projectsLatexState);
  const techLatex = useRecoilValue(techLatexState);
  const [jobDescription, setJobDescription] = useState('');
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState('');
  const [copyLatex, setCopyLatex] = useState("");
  const  setKeywords = useSetRecoilState(keywordsAtom);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copyState, setCopyState] = useState("copy");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setJobDescription(event.target.value);
  };

  const handleAIClick = async () => {
    setLoadingAi(true);
    try {
      const response = await axios.post(backendUrl, {
        description: jobDescription,
        resume: {
          // first filter out the points and the items based on selected or not
         exp: expArray.filter(exp => exp.selected).map(exp => ({
            role: exp.role,
            company: exp.company,
            years: exp.years,
            loc: exp.loc,
            points: exp.points.filter(point => point.selected)
         })),
         projectsArray: projectsArray.filter(proj => proj.selected).map(proj => ({
          name: proj.name,
          tech: proj.tech,
          years: proj.years,
          points: proj.points.filter(point => point.selected)
         }))
        
        }
      });
      setAiGeneratedDescription(response.data.generatedDescription);
      const res = response.data.generatedDescription;
      const newExp = res.expArray.map((exp: { role: string; company: string; years: string; loc: string; points: string[]; }, index: number) => ({
        id: index + 1,
        role: exp.role,
        company: exp.company,
        years: exp.years,
        loc: exp.loc,
        points: exp.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      setExpArray(newExp);
      const newProjects = res.projectsArray.map((proj: { name: string; tech: string; years: string; points: string[]; }, index: number) => ({
        id: index + 1,
        name: proj.name,
        tech: proj.tech,
        years: proj.years,
        points: proj.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      console.log(newProjects);
      setProjectsArray(newProjects);
      setLoadingAi(false);
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
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleGenKeywords = async () => {
    setLoadingKeywords(true);
    try {
      const response = await axios.post(backendUrlGenKey, {
        description: jobDescription
      });
      setKeywords(response.data.keywords);
      setLoadingKeywords(false);
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(copyLatex);
    // alert("Latex copied to clipboard");
    setCopyState("copied");
    setTimeout(() => {
      setCopyState("copy");
    }, 2000);
  };


  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col w-full max-w-xl m-5 bg-gray-100 rounded-lg shadow-md p-5 '>
        <div className='w-full '>
          <textarea
            value={jobDescription}
            onChange={handleInputChange}
            placeholder="Enter job description here"
            rows={10}
            cols={50}
            className='w-full text-xl font-bold p-2 m-2 bg-slate-300 rounded resize-none'
          />

          {aiGeneratedDescription && (
            <div className='mt-5'>
              <h2 className='text-2xl font-bold'>AI Generated Description</h2>
            </div>
          )}
        </div>

        <div className='flex flex-col mx-auto items-center justify-center bg-slate-300 w-full p-5'>
          <div className='flex w-full'>
            <button className='text-xl font-bold m-2 bg-blue-500 p-1 rounded w-1/3 hover:bg-blue-400' onClick={handleAIClick}>{loadingAi ? "loading..." : "AI"}</button>
            <button className='text-xl font-bold m-2 bg-blue-500 p-1 rounded w-2/3 hover:bg-blue-400' onClick={handleAIClickForLatex}>gen latex</button>
            <button className='text-xl font-bold m-2 bg-blue-500 p-1 rounded w-2/3' onClick={handleGenKeywords}>{loadingKeywords ? "loading..." : "gen keywords"}</button>

          </div>
          <div className='cursor-pointer text-3xl font-bold text-center bg-green-500 p-2 rounded w-full hover:bg-green-400' onClick={handleCopyLatex}>{copyState}</div>
        </div>

      </div>
    </div>
  );
};

export default JobDescription;

