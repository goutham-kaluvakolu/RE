import { atom } from 'recoil';
type  edu=  {
    id: number;
    uni: string;
    city: string;
    degree: string;
    year: string;
    selected: boolean;
}[]
type  exp=  {
    id: number;
    role: string;
    company: string;
    years: string;
    loc: string;
    points: {
        id: number;
        text: string;
        selected: boolean;
    }[];
    selected: boolean;
}[]
type projectsType= {
    id: number;
    name: string;
    tech: string;
    years: string;
    points: {
        id: number;
        text: string;
        selected: boolean;
    }[];
    selected: boolean;
}[]
// Atom for education data
export const educationState = atom<edu>({
    key: 'educationState',
    default: [],
});

// Atom for experience data
export const experienceState = atom<exp>({
    key: 'experienceState',
    default: [],
});

// Atom for projects data
export const projectsState = atom<projectsType>({
    key: 'projectsState',
    default: [],
});

// Atom for tech data
export const techState = atom({
    key: 'techState',
    default: {
        languages: [],
        frameworks: [],
        databases: [],
        tools: [],
        os: [],
    },

});


// Atom for education data
export const educationLatexState = atom({
    key: 'educationLatexState',
    default: "",
});

// Atom for experience data
export const experienceLatexState = atom({
    key: 'experienceLatexState',
    default: "",
});

// Atom for projects data
export const projectsLatexState = atom({
    key: 'projectsLatexState',
    default: "",
});



// Atom for tech data
export const techLatexState = atom({
    key: 'techLatexState',
    default: "",
});

// Atom for tech data
export const keywordsAtom = atom({
    key: 'keywords',
    default: [],
});
