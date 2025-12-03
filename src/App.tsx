import { useState } from 'react'
import { motion } from 'framer-motion'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-center gap-8 mb-8">
          <motion.a
            href="https://vite.dev"
            target="_blank"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </motion.a>
          <motion.a
            href="https://react.dev"
            target="_blank"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={reactLogo} className="h-24 w-24" alt="React logo" />
          </motion.a>
        </div>

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Vite + React + TypeScript
        </h1>

        <p className="text-center text-gray-600 mb-8">
          With TailwindCSS & Framer Motion
        </p>

        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={() => setCount((count) => count + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            count is {count}
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm text-center"
          >
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-semibold text-indigo-700">Vite</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <div className="text-sm font-semibold text-purple-700">Tailwind</div>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">✨</div>
            <div className="text-sm font-semibold text-pink-700">Framer</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
