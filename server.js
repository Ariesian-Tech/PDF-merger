import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergepdfs } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(),'index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async function (req, res) {
  try {
    console.log(req.files);

    if (req.files.length < 2) {
      return res.status(400).send('Please upload exactly two PDF files.');
    }

    const pdf1 = path.join(process.cwd(), req.files[0].path);
    const pdf2 = path.join(process.cwd(), req.files[1].path);

  let d=await mergepdfs(pdf1, pdf2);

    res.redirect(`/static/${d}.pdf`);
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Failed to merge PDFs.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// User /merge Route Par PDF Upload Karta Hai:

// User 2 PDFs ko upload karta hai.
// multer middleware un files ko server ke uploads/ folder me save karta hai.
// PDFs Ko Merge Kiya Jata Hai:

// mergepdfs() function call hota hai.
// Dono PDFs merge ho kar public/merged.pdf me save hoti hain.
// User Ko Redirect Kiya Jata Hai:
// Jaise hi merging complete hogi, user ka browser automatically http://localhost:3000/static/merged.pdf par chala jayega.
// Wahan merged PDF ya toh open ho jayegi ya phir download option show hoga (browser ke settings par depend karta hai).