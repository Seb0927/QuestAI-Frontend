'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  const handleSignUp = () => {
    router.push('/content')
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Inicia sesión a AI Quest
        </h1>
        
        {/* Placeholder for logo or illustration */}
        <div className="h-64 mb-8"></div>
        
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-full text-lg font-semibold"
          onClick={handleSignUp}
        >
          Inicia sesión con Google
        </Button>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Al iniciar sesión, aceptas nuestros terminos de servicio y politica de privacidad
        </p>
      </div>
    </div>
  )
}