// const myModule = require('./citation.mjs');

document.getElementById('analyzeButton').addEventListener('click', function () {
    var fileInput = document.getElementById('fileUpload');
    var file = fileInput.files[0]; var formData = new FormData();
    formData.append('file', file);
    fetch('backend-api-url', { method: 'POST', body: formData }).then(function (response) { return response.json(); }).then(function (data) { var resultContainer = document.getElementById('resultContainer'); resultContainer.innerHTML = data.result; }).catch(function (error) { console.error('Error:', error); });
});

document.getElementById('analyzeButton').addEventListener('click', function (e) {
    e.preventDefault(); var fileInput = document.getElementById('fileUpload'); var textInput = document.getElementById('textInput'); var formData = new FormData(); if (fileInput.files[0]) { var file = fileInput.files[0]; formData.append('file', file); } else { var text = textInput.value; formData.append('text', text); } fetch('backend-api-url', { method: 'POST', body: formData }).then(function (response) { return response.json(); }).then(function (data) { var resultContainer = document.getElementById('resultContainer'); resultContainer.innerHTML = data.result; }).catch(function (error) { console.error('Error:', error); });
});

// Function to handle file upload and extract text from PDF
function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const typedarray = new Uint8Array(event.target.result);
            // Load the PDF file
            pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                // Extract text from each page
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    pdf.getPage(i).then(function (page) {
                        return page.getTextContent();
                    }).then(function (content) {
                        // Concatenate text content from all pages
                        content.items.forEach(function (item) {
                            textContent += item.str + '\n';
                        });
                        // Update textarea with extracted text
                        document.getElementById('textInput').value = textContent;
                    });
                }
            });
        };

        reader.readAsArrayBuffer(file);
    }
}

document.getElementById('analyzeButton').addEventListener('click', function (e) {
    e.preventDefault();

    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Perform analysis (dummy logic, replace with actual analysis)
    var isAIGenerated = isAIGeneratedText(textInput);

    // Display result
    var resultContainer = document.getElementById('resultContainer');
    if (isAIGenerated) {
        resultContainer.textContent = "AI generated text";
        document.body.style.backgroundColor = "mistyrose"; // Set background color to red
    } else {
        resultContainer.textContent = "Human generated text";
        document.body.style.backgroundColor = "#98FF98"; // Set background color to green
    }
});


// Dummy function to determine if text is AI generated (replace with actual analysis logic)
function isAIGeneratedText(text) {
    // For demonstration purposes, assume all text is AI generated if it contains the word "AI"
    return text.toLowerCase().includes("ai");
}

document.getElementById('analyzeButton').addEventListener('click', function (e) {
    e.preventDefault();

    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Perform analysis (dummy logic, replace with actual analysis)
    var analysisResult = analyzeText(textInput);

    // Display result
    var resultContainer = document.getElementById('resultContainer');
    var citationContainer = document.getElementById('citationContainer');

    if (analysisResult.isAIGenerated) {
        citationContainer.innerHTML = "<p>AI generated text</p>";
        citationContainer.innerHTML += "<p>Citation links: " + analysisResult.citationLinks.join(", ") + "</p>";
        // resultContainer.innerHTML += "<p>Sophistication level: " + analysisResult.sophisticationLevel + "</p>";
        citationContainer.innerHTML += "<p>Sophistication level:</p>";
        citationContainer.innerHTML += "<ul>";
        citationContainer.innerHTML += "<li>Difficulty to read: " + analysisResult.sophisticationLevel.difficultyToRead + "</li>";
        citationContainer.innerHTML += "<li>Reading ease: " + analysisResult.sophisticationLevel.readingEase + "</li>";
        citationContainer.innerHTML += "<li>Comprehension difficulty: " + analysisResult.sophisticationLevel.comprehensionDifficulty + "</li>";
        citationContainer.innerHTML += "<li>Text readability: " + analysisResult.sophisticationLevel.textReadability + "</li>";
        citationContainer.innerHTML += "<li>Accuracy percentage: " + analysisResult.sophisticationLevel.accuracyPercentage + "</li>";
        citationContainer.innerHTML += "</ul>";
        document.body.style.backgroundColor = "mistyrose"; // Set background color to mistyrose
    } else {
        resultContainer.textContent = "Human generated text";
        document.body.style.backgroundColor = "green"; // Set background color to green
    }
});

// Dummy function to analyze text (replace with actual analysis logic)
function analyzeText(text) {
    // var cite = run()
    // console.log(cite)
    
    // For demonstration purposes, assume all text is AI generated if it contains the word "AI"
    if (text.toLowerCase().includes("ai")) {
        // If AI generated, provide citation links and sophistication attributes
        return {
            isAIGenerated: true,
            citationLinks: [
                "https://www.coursera.org/lecture/statistics/regression-analysis-exploring-the-relationship-between-variables-d08zO",
                "https://www.khanacademy.org/math/statistics-probability/intro-to-probability/linear-relationships-and-scatter-plots/a/regression-and-correlation",
                "https://www.investopedia.com/terms/r/regressionanalysis.asp"
            ],
            sophisticationLevel: {
                difficultyToRead: "High",
                readingEase: "Low",
                comprehensionDifficulty: "High",
                textReadability: "Poor",
                accuracyPercentage: 85 // Replace with actual accuracy percentage
            }
        };
    } else {
        // If human generated, no citation links or sophistication attributes needed
        return {
            isAIGenerated: false
        };
    }
}

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyC_q1kel5pXMXbyZWzOtpMZPg8xEXp8fR8");

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const text1 = "Water quality evaluation and efficient treatment methods play a crucial function in the efficient and sustainable use of water resources. With increasing water demands and concerns about water scarcity and contamination, there is a growing need to predict water quality and identify appropriate treatment methods. In this review paper, we provide a comprehensive overview of the status quo of water quality prediction, treatment method prediction, and use case classification. We examine the differenRegression analyzes the relationship between variables. It aims to find a line (for linear regression) that best fits the data points. This line helps predict a dependent variable (what you want to forecast) based on an independent variable (what you're basing the prediction on). It's a fundamental tool for modeling trends and making data-driven predictions";

//   // Specify the prompt with the stored input
//   const prompt = `Provide web citations on : ${text1}`;

//   try {
//     // Generate content based on the prompt
//     const result = await model.generateContent(prompt);
    
//     // Extract the response from the result
//     const response = await result.response;
    
//     // Extract the text from the response
//     const generatedText = response.text();

//     // Print the generated text
//     console.log(generatedText);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// run();



document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
