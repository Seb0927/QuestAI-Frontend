import { User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold">✏️ AI Interview Assistant</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          Log Out
        </button>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={20} className="text-gray-600" />
        </div>
      </div>
    </header>
  )
}