const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { config } = require("process");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle proxy requests
app.all("/proxy", async (req, res) => {
  const { url } = req.query; // Extract method and URL from query parameters
  const { method, headers, requestData } = req.body;

  try {
    const axiosConfig = {
      method: method || "GET",
      url: url,
      headers,
      data: requestData,
    };
    const response = await axios(axiosConfig);

    console.log('response', response)
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Failed to proxy request" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
