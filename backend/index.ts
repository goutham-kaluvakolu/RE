const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.API_KEY;

app.post('/api/generate-description', async (req, res) => {
    const { description, resume } = req.body;

    const prompt = `
    Given this job description ${description} and the following resume data ${JSON.stringify(resume)}, analyze the job description to find the key words for ATS and edit the resume points such that the key words are incorporated. If a point needs to be edited, keep the original point and the edited version in the array. If the point is not for the edited version, add the prefix **. Include both the original and modified points in the response, even if a point is not edited. The output should include a JSON object with all the variables expArray, projectsArray, techObject, and should have both the original and modified points, with the modified points prefixed with **.
    infer my knowledege based on resume and do not asssume anything , speak the truth.
    DONT DIRECTLY EDIT THE POINT, KEEP THE COPY OF THE ORIGINAL AND MODIFIED POINT IN THE ARRAY , I wont accept if your reply is not in json format
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
                    "** Contributed to the conversion of the application’s UI to a new, optimized design, x,y z...., resulting in improved user experience.",
                    "Overhauled legacy code to recent React code while adhering to best coding practices, resulting in increased maintainability.",
                    "** Overhauled legacy code to recent React code while adhering to best coding practices, creating elegant and effective UI solutions.",
                    "Implemented 3 forms, dependent on API calls, and stored their information and selections in Redux.",
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
                    "** Developed a serverless blogging platform utilizing Cloudflare Workers and Hono, enhancing scalability and reducing server management overhead for a seamless user experience.",
                    "Engineered a PostgreSQL database with Prisma ORM, creating complex schemas to support user-generated content, including blog posts, comments, tags, and bookmarks, enabling a rich user interaction ecosystem.",
                    "** Engineered a PostgreSQL database with Prisma ORM, creating complex schemas for user-generated content including blog posts and comments, supporting user engagement.",
                ]
            }
        ],
        "techObject": {}
    }`;

    console.log(prompt);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                // max_tokens: 1000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        let responseText = response.data.choices[0].message.content;

        // Log the raw response text for debugging
        console.log('Raw response:', responseText);

        // Remove ```json\n and any extraneous formatting
        responseText = responseText.replace(/```json\n|```/g, '');

        // Log the cleaned response text for debugging
        console.log('Cleaned response:', responseText);

        // Convert string to JSON
        const responseObject = JSON.parse(responseText);

        res.json({ "generatedDescription": responseObject });

    } catch (error) {
        console.error('Error generating description:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating description');
    }
});


app.post('/api/keywords-generator', async (req, res) => {
    const { description } = req.body;

    const prompt = `
    Given this job description: "${description}", identify and list the most important keywords that will help achieve a great ATS score. The keywords should be separated by commas.
    Do not return the keywords as a group of strings.
    `;

    console.log(prompt);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                // max_tokens: 1000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        let responseText = response.data.choices[0].message.content;

        // Log the raw response text for debugging
        console.log('Raw response:', responseText);

        // Remove ```json\n and any extraneous formatting
        // responseText = responseText.replace(/```json\n|```/g, '');

        // code to convert string to Array
        const keywordsArray = responseText.split(',').map(item => item.trim());

        // Log the cleaned response text for debugging
        console.log('Cleaned response:', responseText);


        res.json({ "keywords": keywordsArray });

    } catch (error) {
        console.error('Error generating description:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating description');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
