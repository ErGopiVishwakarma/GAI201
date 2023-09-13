const express = require('express');
const OpenAI = require("openai");
const cors=require("cors")
require("dotenv").config();


const app = express();
app.use(cors())
app.use(express.json())
console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

app.get("/",(req,res)=>{
  res.send("hello")
})


app.post("/",async (req,res)=>{
  const {topic,wantTo} = req.body
  console.log(req.body)
 
  try {
   
      const completion = await openai.chat.completions.create({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": `generate random ${wantTo} on topic ${topic} give only on ${wantTo} at a time`}],
        "temperature": 0.7
      });
      res.status(200).send(completion.choices[0].message.content);
    
  } catch (error) {
    res.status(400).send({
      error }
    )
  }
})


app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
    