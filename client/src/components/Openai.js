import React from "react";

export default function Openai() {
  const apiKey = "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";
  const endpoint = "https://api.openai.com/v1/images/generations";

  const text = "horse";
  const model = "image-alpha-001";
  const prompt = `Text-to-image synthesis using the ${model} model: ${text}`;

  const [image, setImage] = React.useState("");

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  });

  const payload = {
    model,
    prompt,
    num_images: 1,
    size: "256x256",
    response_format: "url",
  };
  React.useEffect(() => {
    fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed.");
      })
      .then((data) => {
        setImage(data.data[0].url);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(image);
  }, []);

  return (
    <img src={image} alt="hbcd" style={{ margin: "20px", padding: "30px" }} />
  );
}
