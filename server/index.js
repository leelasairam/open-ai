import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const port = process.env.PORT || 8000;

const config = new Configuration({
    apiKey: process.env.openai_key,
  });

const openai = new OpenAIApi(config);

const app = express()
app.use(cors({
    origin: ["http://localhost:5500","https://ai-speaks.netlify.app"]
}))
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Server running'
    })
})

app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5, 
        presence_penalty: 0, 
      });
  
      res.status(200).send({result: response.data.choices[0].text});
      //console.log(response.data.choices[0].text);
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong');
    }
})
  
app.listen(port, () => {
console.log('Server started')
})