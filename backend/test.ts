const pdflatex = require('node-pdflatex')
 
async function testPdflatex (){
    
const source = `
\\documentclass{article}
\\begin{document}
Hello World!
\\end{document}
`
 
const pdf = await pdflatex(source)
console.log(pdf)
}

testPdflatex()