import { ChevronDownIcon } from '@heroicons/react/20/solid'
import JobDescription from './components/JobDescription';
import { useState } from 'react';
import Edu from './components/Edu';
import Exp from './components/Exp';
import Projects from './components/Projects';
import Tech from './components/Tech';
import { useRecoilValue } from 'recoil';
import { keywordsAtom } from './atom';

function App() {
  const [eduVisible, setEduVisible] = useState(true);
  const [expVisible, setExpVisible] = useState(true);
  const [projVisible, setProjVisible] = useState(true);
  const [techVisible, setTechVisible] = useState(true);
  const keyword = useRecoilValue(keywordsAtom);
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Resume Editor</h1>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4  z-10'>
          <JobDescription />
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
        <div className='flex flex-col gap-4 p-4'>
          {keyword.map((k, index) => <div className="mr-0 text-end" key={index}>{k}</div>)}
        </div>
      </div>
      

    </div>

  );
}

export default App;
