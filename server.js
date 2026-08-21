import express from "express";
import cors from "cors";
import { execSync } from "child_process";

const app = express();
app.use(cors());
const PORT = 3001;

// Dummy PR titles for demo
const prs = [
  "Day 8 PR demo",
  "Day 7 PR demo",
  "Day 6 PR demo",
  "Day 5 PR demo"
];

function summarizePR(prTitle) {
  const prompt = `Summarize this PR title: ${prTitle}`;
  const output = execSync(`ollama run llama3 "${prompt}"`);
  return output.toString();
}

app.get("/prs", (req, res) => {
  const result = prs.map(title => ({
    title,
    summary: summarizePR(title)
  }));

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
