'use client'

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
          Sign up to AI Interview Pro
        </h1>
        
        {/* Placeholder for logo or illustration */}
        <div className="h-64 mb-8"></div>
        
        <button 
          className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-full text-lg font-semibold"
          onClick={handleSignUp}
        >
          Sign Up with Google
        </button>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          By signing up you agree to our terms of service and privacy policy
        </p>
      </div>
    </div>
  )
}