import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


// Random Number Generator
export const getRandomNumber = () => {
    const random = Math.floor(Math.random() * 50);
    return random;
};