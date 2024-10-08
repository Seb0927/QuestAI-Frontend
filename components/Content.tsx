'use client'

import { useState } from 'react'
import { ChevronRight, Mic, Circle} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Interviewee {
  id: number
  name: string
  question: string
  response: string
}

export default function Content() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(apiKey);

  async function generateSummary(style: number) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    let result;

    if (style == 0){
      result = await model.generateContent([`
        A partir de ahora te comportarás como un asistente para entrevistas que habla en español.
        Tu responsabilidad será ayudar al entrevistador con las tareas que se te encomendarán. 
        Tu recibes las preguntas y respuestas de los entrevistados. No debes de usar
        markdown.
  
        Genera un resumén sobre la siguientes respuestas de los entrevistados en español. 
        El resumen debe de ser general sobre todos los entrevistados y no ir sobre 
        cada una de las respuestas. No debes de sobrepasar más de 75 palabras. \n
        
        Aquí te brindo las preguntas y respuestas de cada entrevistado: \n
        `, intervieweesText]);
    } else if (style == 1){
      result = await model.generateContent([`
        A partir de ahora te comportarás como un asistente para entrevistas que habla en español.
        Tu responsabilidad será ayudar al entrevistador con las tareas que se te encomendarán. 
        Tu recibes las preguntas y respuestas de los entrevistados. No debes de usar
        markdown.
  
        Genera un resumén general sobre cada entrevistado en español. El resumen debe de
        ser general sobre cada uno de los entrevistados y cada resumen de entrevistado no
        debe de sobrepasar más de 50 palabras. \n
        
        El formato de entrega debe de ser el siguiente: \n

        Entrevistado 1:
        [Resumen de 50 palabras]

        Entrevistado 2:
        [Resumen de 50 palabras]
        
        Aquí te brindo las preguntas y respuestas de cada entrevistado: \n
        `, intervieweesText]);
    } else if (style == 2){
      result = await model.generateContent([`
        A partir de ahora te comportarás como un asistente para entrevistas que habla en español.
        Tu responsabilidad será ayudar al entrevistador con las tareas que se te encomendarán. 
        Tu recibes las preguntas y respuestas de los entrevistados. No debes de usar
        markdown.
  
        Deberás de escoger quien es el candidato ideal para el puesto de trabajo en base a las
        preguntas realizadas. ¿Por qué se acomoda mejor para el puesto?, ¿Por qué es mejor que
        los demás candidatos?, ¿Qué habilidades lo hacen destacar? \n

        El formato de entrega debe de ser el siguiente:
        "El candidato ideal para el puesto es el entrevistado [Número de entrevistado] 
        porque..." \n
        
        Aquí te brindo las preguntas y respuestas de cada entrevistado: \n
        `, intervieweesText]);
    } else {
      result = await model.generateContent([`
        Just answer this: '~(˘▾˘~)' Don't answer anything different, just this: '~(˘▾˘~)'`])
    }

    console.log(result.response.text());
    
    const formattedResult = result.response.text().split('\n');
    setSummaryResult(formattedResult);
  }

  const [isRecording, setIsRecording] = useState(false)
  const [activeButton, setActiveButton] = useState<'question' | 'answer'>('question')
  const [summaryResult, setSummaryResult] = useState<string[]>([])
  const [interviewees] = useState<Interviewee[]>([
    { id: 1, name: 'Interviewee 1', question:'Question 1: Tell me about yourself', response: "I'm a web developer with five years of experience. I've worked with Ruby on Rails and JavaScript, and I'm familiar with RESTful APIs and modern front-end frameworks like React." },
    { id: 2, name: 'Interviewee 2', question:'Question 1: Tell me about yourself', response: "I'm a software engineer with three years of experience. My primary language is Python, and I've worked on a variety of projects, including web applications and data analysis tools." },
    { id: 3, name: 'Interviewee 3', question:'Question 1: Tell me about yourself', response: "I'm a full-stack developer with two years of experience. I've worked with Java and Angular, and I'm interested in learning more about cloud computing and microservices architecture." },
    { id: 4, name: 'Interviewee 4', question:'Question 1: Tell me about yourself', response: "I'm a front-end engineer with four years of experience. I specialize in responsive design and performance optimization, and I enjoy experimenting with new CSS features and animations." },
  ])

  const intervieweesText = interviewees.map(interviewee => 
    `Interview ${interviewee.id}\n
    Question: ${interviewee.question}\n
    ${interviewee.response}\n`
  ).join('\n');

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const toggleActiveButton = (button: 'question' | 'answer') => {
    setActiveButton(button)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center my-8">¡Tu asistente de IA para entrevistas!</h2>
        <div className="flex items-center space-x-2 mb-4">
          <button
            className="bg-red-600 text-white p-3 rounded-full flex-shrink-0 transition-all duration-300 ease-in-out"
            onClick={toggleRecording}
          >
            {isRecording ? <Circle size={24} /> : <Mic size={24} />}
          </button>
          <div className="flex-grow flex space-x-2">
            <button
              className={`px-6 py-3 rounded-full flex-grow text-center transition-colors duration-300 ease-in-out ${
                activeButton === 'question' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => toggleActiveButton('question')}
            >
              Pregunta
            </button>
            <button
              className={`px-6 py-3 rounded-full flex-grow text-center transition-colors duration-300 ease-in-out ${
                activeButton === 'answer' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => toggleActiveButton('answer')}
            >
              Respuesta
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {interviewees.map((interviewee) => (
            <div key={interviewee.id} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {interviewee.question}
                </h3>
                <ChevronRight className="text-gray-400" />
              </div>
              <p className="text-gray-600 mt-1">{interviewee.name}</p>
              <p className="mt-2">{interviewee.response}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700" onClick={() => generateSummary(0)}>
                Generate a summary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Resumen de los candidatos:</DialogTitle>
                <DialogDescription>
                  {summaryResult.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300" onClick={() => generateSummary(1)}>
                Generate a summary for every Interviewee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Resumen de cada entrevistado:</DialogTitle>
                <DialogDescription>
                  {summaryResult.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300" onClick={() => generateSummary(2)}>
                Who is the best
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>El mejor candidato:</DialogTitle>
                <DialogDescription>
                  {summaryResult.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300">
                Translate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hello</DialogTitle>
                <DialogDescription>
                  You are welcome
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300">
                Delete all
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hello</DialogTitle>
                <DialogDescription>
                  You are welcome
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}