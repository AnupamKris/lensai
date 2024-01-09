import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBv6A0mzzKHry7TbT6xInbRjRgu9H8_P5o";
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

async function run(file) {
  // For text-and-images input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "What is this image?";

  const fileInputEl = document.querySelector("input[type=file]");
  const imageParts = [file];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}

export { run };
