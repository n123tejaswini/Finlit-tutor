import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../data/cityPrices.json");

export async function getCityPrices() {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}
