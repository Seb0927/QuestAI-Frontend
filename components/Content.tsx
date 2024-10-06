'use client'

import { useState } from 'react'
import { ChevronRight, Mic, Circle, User } from 'lucide-react'

interface Interviewee {
  id: number
  name: string
  response: string
}

export default function Content() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(["Genera un resumén sobre la siguientes respuestas de los entrevistados de un párrafo en español: ", intervieweesText]);
    alert(result.response.text());
  }

  const [isRecording, setIsRecording] = useState(false)
  const [activeButton, setActiveButton] = useState<'question' | 'answer'>('question')
  const [interviewees] = useState<Interviewee[]>([
    { id: 1, name: 'Interviewee 1', response: "I'm a web developer with five years of experience. I've worked with Ruby on Rails and JavaScript, and I'm familiar with RESTful APIs and modern front-end frameworks like React." },
    { id: 2, name: 'Interviewee 2', response: "I'm a software engineer with three years of experience. My primary language is Python, and I've worked on a variety of projects, including web applications and data analysis tools." },
    { id: 3, name: 'Interviewee 3', response: "I'm a full-stack developer with two years of experience. I've worked with Java and Angular, and I'm interested in learning more about cloud computing and microservices architecture." },
    { id: 4, name: 'Interviewee 4', response: "I'm a front-end engineer with four years of experience. I specialize in responsive design and performance optimization, and I enjoy experimenting with new CSS features and animations." },
  ])

  const intervieweesText = interviewees.map(interviewee => 
    `Interview ${interviewee.id}\n${interviewee.response}\n`
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
                  Question 1: Tell me about yourself
                </h3>
                <ChevronRight className="text-gray-400" />
              </div>
              <p className="text-gray-600 mt-1">{interviewee.name}</p>
              <p className="mt-2">{interviewee.response}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          <button className="bg-red-600 text-white px-4 py-2 rounded-full" onClick={run}>
            Generar un resumen
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
            Generar un resumen por cada entrevistado
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
            ¿Quien es el mejor?
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
            Traducir
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  )
}