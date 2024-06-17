import { ChevronDownIcon } from '@heroicons/react/20/solid'
import JobDescription from './components/JobDescription';
import { useState } from 'react';
import Edu from './components/Edu';
import Exp from './components/Exp';
import Projects from './components/Projects';
import Tech from './components/Tech';

function App() {
  const [eduVisible, setEduVisible] = useState(false);
  const [expVisible, setExpVisible] = useState(false);
  const [projVisible, setProjVisible] = useState(false);
  const [techVisible, setTechVisible] = useState(false);
  return (
    <div className='flex flex-col gap-4'>
      <h1 className="bg-slate-500 text-white text-xl font-bold p-2">Resume Editor</h1>
      <JobDescription/>
      <button className="flex items-center gap-2 text-left font-bold font-xl p-2" onClick={() => setEduVisible(!eduVisible)}>
        <ChevronDownIcon className={`${eduVisible ? 'transform rotate-180' : ''} w-4 h-4`} />
        Education
      </button>
      {eduVisible && <Edu />}
      <hr className="border-slate-500" />
      <button className="flex items-center gap-2 text-left font-bold font-xl p-2" onClick={() => setExpVisible(!expVisible)}>
        <ChevronDownIcon className={`${expVisible ? 'transform rotate-180' : ''} w-4 h-4`} />
        Experience
      </button>
      {expVisible && <Exp />}
      <hr className="border-slate-500" />
      <button className="flex items-center gap-2 text-left font-bold font-xl p-2" onClick={() => setProjVisible(!projVisible)}>
        <ChevronDownIcon className={`${projVisible ? 'transform rotate-180' : ''} w-4 h-4`} />
        Projects
      </button>
      {projVisible && <Projects />}
      <hr className="border-slate-500" />
      <button className="flex items-center gap-2 text-left font-bold font-xl p-2" onClick={() => setTechVisible(!techVisible)}>
        <ChevronDownIcon className={`${techVisible ? 'transform rotate-180' : ''} w-4 h-4`} />
        Technologies
      </button>
      {techVisible && <Tech />}
    </div>
  );
} 

export default App;
