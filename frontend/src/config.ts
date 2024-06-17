// export const backendUrl = "http://your-backend-url/api/generate-description";

// config.js
export const eduArray = [
    {
        uni:"Bachelor of Technology",
        degree:"Computer Science and Engineering",
        year:"2018 - 2022",
        points:[
            "CGPA: 8.5/10"],
        city:"Vellore Institute of Technology, Vellore, India"}
  
]
export const expArray = [
    {
        role:"Software Developer Intern",
        company: "Miq Digital",
        years:"Nov. 2020 -- Sep. 2021",
        loc:"Bangalore, India",
        points:[
            "Contributed to the conversion of the application's UI to a new, optimized design, resulting in improved user experience.",
            "Overhauled legacy code to recent React code while adhering to best coding practices, resulting in increased maintainability.",
            "Implemented 3 forms, dependent on API calls, and stored their information and selections in Redux.",
            "Created a white-label version of the application for two external clients.",
            "developed  2  RESTful controllers for data manipulation, storage, and retrieval from AWS and internal services utilizing Spring MVC, Spring Boot, Spring JDBC",
            "Wrote 25-33 percent of front-end automated tests using Selenium and numerous back-end unit tests with Junit for quality assurance, reducing vulnerabilities, and enhancing deployment confidence..",
            "Detected and fixed bugs, user complaints, requests, permissions, and other issues across over 10 instances as the bug master and admin, supporting continuous integration and continuous delivery using Jenkins in agile scrum based enivroment .",
            "Co-authored two sets of documentation detailing the backend APIs of the applications and the onboarding process for new employees."
        
        ]
    }
    ];
// config.js
export const projectsArray = [    
    {
        name:"Blogging Website",
        tech: ["TypeScript","React","Serverless","Tailwind","ORM"],
        years:"April 2024 - May 2024",
        points:[
            "Developed a server less blogging platform utilizing Cloudflare Workers and Hono, enhancing scalability and reducing server management overhead.",
            "Engineered a PostgreSQL database with Prisma ORM, creating complex schemas to support user-generated content, including blog posts, comments, tags, and bookmarks, enabling a rich user interaction ecosystem.",
            "Added Zod Validation for all user inputs and data entries; deployed Zod modules as commons in npm to facilitate reuse and standardization across projects.",
            "Integrated JWT authentication for secure user login and session management",
            "Enabled users to follow specific tags and receive personalized blog recommendations.",
            "Created features allowing users to bookmark and interact with their favorite blogs, including liking and sharing, fostering community engagement.",
            "Built a dynamic and responsive front-end using React, Recoil, and Tailwind CSS.",
            "Implemented AI-driven tag suggestions during blog creation, facilitating better content categorization and discoverability."
        ]
    },
    {
        name:"Portfolio Website",
        tech: ["Next.js", "TypeScript", "Tailwind", "CSS", "GitHub API", "RAG"],
        years:"May 2024 - June 2024",
        points:[
            "Developed a portfolio website usingNext.js for server-side rendering, TypeScriptfor type safety, and Tailwind CSS for responsive design and styling.",
            "Integrated the website with GitHub API to dynamically fetch and display all projects, providing up-to-date information about personal and professional projects.",
            "Implemented a chatbot using Retrieval-Augmented Generation (RAG) that utilizes a vector store based on project README files and ChatGPT to answer technical questions about the projects."
        ]
    },
    {
        name:"Manga Art Colorization",
        tech: ["Deep learning", "Python", "OpenCV", "computer vision"],
        years:"May 2023 - July 2023",
        points:[
            "Automated manga colorization process with a 70% accuracy rate using Generative Adversarial Networks methodology, significantly reducing manual intervention.",
            "Created a dataset of 1500 images using web scraping tools",
            "Explored data augmentation techniques, increasing dataset size to 12000 while determining optimal image sizes for training.",
            "Tried and tested multiple architectures and pretrained models (VGG16/19, ResNet50, UNET).",
            "Designed discriminator model using custom-built convolutional neural network (CNN) consisting of 17 layers from the ground up.",
            "Leveraged TensorFlow and five other associated libraries to streamline the colorization process."
        ]
    },
    {
        name:"UTA market place",
        tech: ["DBMS","SQL"],
        years:"Jan. 2023 - April 2023",
        points:[
            "Collaborated with a team of 4 to create a student-focused online marketplace, emphasizing user experience and security.",
            "Executed multiple phases of product development, encompassing business requirement gathering, ER diagram creation, and database schema development."
        ]
    },
    ];

// config.js
export const techObject = {
    "languages":[
        "JavaScript",
        "TypeScript",
        "Java",
        "Python",
        "C++",
        "Go"
    ],
    "frameworks":[
        "React",
        "Angular",
        "Next.js"
    ],
    "databases":[
        "MongoDB",
        "PostgreSQL",
        "MySQL"
    ],
    "tools":[
        "Git",
        "GitHub",
        "Jira",
        "Trello"
    ],
    "os":[
        "Windows",
        "Linux"
    ],
    "misc":[ ],

    "all":[
        "JavaScript",
        "TypeScript",
        "Java",
        "Python",
        "C++",  
        "C#",
        "PHP",
        "Ruby",
        "Go",
        "Rust",
        "Kotlin",
        "Swift",
        "Dart", 
        "Scala",
        "C",
        "R",
        "Objective-C",
        "Shell",
        "SQL",
        "HTML",
        "CSS",
        "Sass",
        "LESS",
        "Vue",
        "React",
        "Angular",
        "Ember",    
        "Svelte",
        "Preact",
        "Gatsby",
        "Next.js",
        "Nuxt.js",
        "Django",
        "Flask",
        "Laravel",
        "Symfony",
        "Ruby on Rails",
        "Node.js",
        "Express.js",
        "GraphQL",
        "Apollo",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Oracle",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",    
        "GraphQL",
        "Apollo",]
} 



export const latexTex =`
\\documentclass[letterpaper,11pt]{article} 
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
    \\textbf{\\Huge \\scshape Goutham Kaluvakolu} \\\\ \\vspace{1pt}
    \\small 682-414-9852 $|$ \\href{mailto:goutham4331@gmail.com}{\\underline{goutham4331@gmail.com}} $|$ 
    \\href{https://github.com/goutham-kaluvakolu}{\\underline{github}} $|$ 
    \\href{https://linkedin.com/in/goutham-kumar-reddy-kaluvakolu}{\\underline{linkedin}} 
    % $|$
    % \\href{https://github.com/...}{\\underline{github.com/jake}}
\\end{center}
`

