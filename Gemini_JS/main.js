const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC_q1kel5pXMXbyZWzOtpMZPg8xEXp8fR8");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const text1 = "Water quality evaluation and efficient treatment methods play a crucial function in the efficient and sustainable use of water resources. With increasing water demands and concerns about water scarcity and contamination, there is a growing need to predict water quality and identify appropriate treatment methods. In this review paper, we provide a comprehensive overview of the status quo of water quality prediction, treatment method prediction, and use case classification. We examine the differenRegression analyzes the relationship between variables. It aims to find a line (for linear regression) that best fits the data points. This line helps predict a dependent variable (what you want to forecast) based on an independent variable (what you're basing the prediction on). It's a fundamental tool for modeling trends and making data-driven predictions";

  // Specify the prompt with the stored input
  const prompt = `Provide web citations on : ${text1}. Give in json format`;

  try {
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    
    // Extract the response from the result
    const response = await result.response;
    
    // Extract the text from the response
    const generatedText = response.text();

    // Print the generated text
    console.log(generatedText);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the run function to execute the code
run();

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyC_q1kel5pXMXbyZWzOtpMZPg8xEXp8fR8");

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const text1 = "Deep Learning"
//   const prompt = "Give the citation on ${text1}"

//   const result = await model.generateContent(text1);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();