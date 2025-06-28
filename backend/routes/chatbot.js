const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  // Simple keyword-based responses
  if (/add book/i.test(message)) {
    return res.json({ reply: "Only admins can add books. Go to the Add Book section if you are an admin." });
  }
  if (/find.*book/i.test(message)) {
    return res.json({ reply: "Use the search bar to find books by name or author." });
  }
  if (/login|logout/i.test(message)) {
    return res.json({ reply: "Use the Login/Logout button at the top right." });
  }
  res.json({ reply: "Sorry, I didn't understand. Try asking about books, borrowing, or admin actions." });
});

module.exports = router;