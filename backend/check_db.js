import db from './config/db.mjs';

async function check() {
  try {
    console.log("Checking columns of quiz_questions...");
    const [cols] = await db.query("SHOW COLUMNS FROM quiz_questions");
    console.table(cols);

    console.log("\nChecking quiz_questions rows:");
    const [rows] = await db.query("SELECT id, quiz_id, question, correct, CHAR_LENGTH(image) as img_len, SUBSTRING(image, 1, 50) as img_preview FROM quiz_questions");
    console.table(rows);
    
    console.log("\nChecking quizzes table rows:");
    const [quizzes] = await db.query("SELECT id, title FROM quizzes");
    console.table(quizzes);

    process.exit(0);
  } catch (err) {
    console.error("Error during check:", err);
    process.exit(1);
  }
}

check();
