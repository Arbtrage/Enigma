const axios = require("axios");

module.exports = async (data) => {
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
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: data.id,
      source_code: data.code,
      stdin: data.input,
      stdout: data.output,
    },
  };

  try {
    const response = await axios.request(options);
    const {stdout,stderr,status}=response.data;
    return {
      status:200,
      Output:stdout,
      Error:stderr,
      Message:status.description
    };
  } catch (error) {
    return {
      status:error.status,
      Message:error.message
    };
  }
};
