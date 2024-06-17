const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
// const mockdata = require('./mock');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// const { OPENAI_API_KEY } = process.env;
const OPENAI_API_KEY = process.env.API_KEY;


const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 5000;

const mockdata = {
    "expArray": [
        {
            "role": "Software Developer Intern",
            "company": "Miq Digital",
            "years": "Nov. 2020 -- Sep. 2021",
            "loc": "Bangalore, India",
            "points": [
                "Contributed to the conversion of the application's UI to a new, optimized design, resulting in improved user experience.",
                "Overhauled legacy code to recent React code while adhering to best coding practices, resulting in increased maintainability.",
                "Implemented 3 forms, dependent on API calls, and stored their information and selections in Redux.",
                "Created a white-label version of the application for two external clients.",
                "Developed 2 RESTful controllers for data manipulation, storage, and retrieval from AWS and internal services utilizing Spring MVC, Spring Boot, Spring Jdbc.",
                "Wrote 25-33 percent of front-end automated tests using Selenium and numerous back-end unit tests with Junit for quality assurance, reducing vulnerabilities, and enhancing deployment confidence.",
                "Detected and fixed bugs, user complaints, requests, permissions, and other issues across over 10 instances as the bug master and admin, supporting continuous integration and continuous delivery using Jenkins in agile scrum based environment.",
                "Co-authored two sets of documentation detailing the backend APIs of the applications and the onboarding process for new employees."
            ]
        }
    ],
    "projectsArray": [
        {
            "name": "Blogging Website",
            "tech": ["TypeScript", "React", "Serverless", "Tailwind", "ORM"],
            "years": "April 2024 - May 2024",
            "points": [
                "Developed a serverless blogging platform utilizing Cloudflare Workers and Hono, enhancing scalability and reducing server management overhead.",
                "Engineered a PostgreSQL database with Prisma ORM, creating complex schemas to support user-generated content, including blog posts, comments, tags, and bookmarks, enabling a rich user interaction ecosystem.",
                "Added Zod Validation for all user inputs and data entries; deployed Zod modules as commons in npm to facilitate reuse and standardization across projects.",
                "Integrated JWT authentication for secure user login and session management.",
                "Enabled users to follow specific tags and receive personalized blog recommendations.",
                "Created features allowing users to bookmark and interact with their favorite blogs, including liking and sharing, fostering community engagement.",
                "Built a dynamic and responsive front-end using React, Recoil, and Tailwind CSS."
            ]
        },
        {
            "name": "Portfolio Website",
            "tech": ["Next.js", "TypeScript", "Tailwind", "CSS", "GitHub API", "RAG"],
            "years": "May 2024 - June 2024",
            "points": [
                "Developed a portfolio website using Next.js for server-side rendering, TypeScript for type safety, and Tailwind CSS for responsive design and styling.",
                "Integrated the website with GitHub API to dynamically fetch and display all projects, providing up-to-date information about personal and professional projects.",
                "Implemented a chatbot using Retrieval-Augmented Generation (RAG) that utilizes a vector store based on project README files and ChatGPT to answer technical questions about the projects."
            ]
        },
        {
            "name": "Manga Art Colorization",
            "tech": ["Deep learning", "Python", "OpenCV", "computer vision"],
            "years": "May 2023 - July 2023",
            "points": [
                "Automated manga colorization process with a 70% accuracy rate using Generative Adversarial Networks methodology, significantly reducing manual intervention.",
                "Created a dataset of 1500 images using web scraping tools.",
                "Explored data augmentation techniques, increasing dataset size to 12000 while determining optimal image sizes for training.",
                "Tried and tested multiple architectures and pretrained models (VGG16/19, ResNet50, UNET).",
                "Designed discriminator model using custom-built convolutional neural network (CNN) consisting of 17 layers from the ground up.",
                "Leveraged TensorFlow and five other associated libraries to streamline the colorization process."
            ]
        },
        {
            "name": "UTA market place",
            "tech": ["DBMS", "SQL"],
            "years": "Jan. 2023 - April 2023",
            "points": [
                "Collaborated with a team of 4 to create a student-focused online marketplace, emphasizing user experience and security.",
                "Executed multiple phases of product development, encompassing business requirement gathering, ER diagram creation, and database schema development."
            ]
        }
    ],
    "techObject": {
        "languages": [
            "JavaScript",
            "TypeScript",
            "Java",
            "Python",
            "C++",
            "Go"
        ],
        "frameworks": [
            "React",
            "Angular",
            "Next.js"
        ],
        "databases": [
            "MongoDB",
            "PostgreSQL",
            "MySQL"
        ],
        "tools": [
            "Git",
            "GitHub",
            "Jira",
            "Trello"
        ],
        "os": [
            "Windows",
            "Linux"
        ],
        "misc": [],
        "all": [
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
            "Apollo"
        ]
    }
};


app.use(cors());
app.use(bodyParser.json());


app.post('/api/generate-description', async (req, res) => {
    const { description, resume } = req.body;

    const prompt = `
    Given this job description ${description} and the following resume data ${JSON.stringify(resume)}, analyze the job description to find the key words for ATS and edit the resume points such that the key words are incorporated. If a point needs to be edited , keep the original point and the edited version in the array. If the point is not for the edited version , add the prefix ** . Include both the original and modified points in the response, even if a point is not edited. The output should include a JSON object with all the variables expArray, projectsArray, techObject, and should have both the original and modified points, with the modified points prefixed with **.
    DONT DIRECTLY EDIT THE POINT , KEEP THE COPY OF THE ORIGINAL AND MODIFIED POINT IN THE ARRAY 
    Example response format:
    {
        "expArray": [
            {
                "role": "Software Developer Intern",
                "company": "Miq Digital",
                "years": "Nov. 2020 -- Sep. 2021",
                "loc": "Bangalore, India",
                "points": [
                    "Contributed to the conversion of the application’s UI to a new, optimized design, resulting in improved user experience.",
                    "** Contributed to the conversion of the application’s UI to a new, optimized design,using HTML, CSS, React, resulting in improved userexperience.
                    "Overhauled legacy code to recent React code while adhering to best coding practices, resulting in increased maintainability.",
                    "** Overhauled legacy code to recent React code while adhering to best coding practices, creating elegant and effective UI solutions.", 
                    "Implemented 3 forms, dependent on API calls, and stored their information and selections in Redux.",
                    "** Implemented 3 forms, dependent on API calls, and stored their information and selections in Redux, ensuring seamless communication between components.",  
                ]
            }
        ],
        "projectsArray": [
        {
            "name": "Blogging Website",
            "tech": ["TypeScript", "React", "Serverless", "Tailwind", "ORM"],
            "years": "April 2024 - May 2024",
            "points": [
                "Developed a serverless blogging platform utilizing Cloudflare Workers and Hono, enhancing scalability and reducing server management overhead.",
                "** Developed a serverless blogging platform utilizing Cloudflare Workers and Hono, enhancing scalability and useability.",
                "Engineered a PostgreSQL database with Prisma ORM, creating complex schemas to support user-generated content, including blog posts, comments, tags, and bookmarks, enabling a rich user interaction ecosystem.",
                "Added Zod Validation for all user inputs and data entries; deployed Zod modules as commons in npm to facilitate reuse and standardization across projects.",
                "**modified Zod Validation for all user inputs and data entries; deployed Zod modules as commons in npm to facilitate reuse and standardization across projects.",
            ]
        },
        ],
        "techObject": {}
    }
    `;

    console.log(prompt);

    try {

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: prompt }],
                // max_tokens: 1000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        console.log(response.data.choices);
        let responseText = response.data.choices[0].message.content;

        // Remove ```json\n and any extraneous formatting
        responseText = responseText.replace(/```json\n|```/g, '');

        // Convert string to JSON
        const responseObject = JSON.parse(responseText);

        res.json({ "generatedDescription": responseObject });

    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).send('Error generating description');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

