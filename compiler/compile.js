const axios = require("axios");

module.exports = async (code) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",
      wait: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key":process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: 53,
      source_code:code,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
