import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LaunchList from './pages/LaunchList'
import LaunchDetail from './pages/LaunchDetail'
import Visualizations from './pages/Visualizations'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LaunchList />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
        <Route path="/visualizations" element={<Visualizations />} />
      </Routes>
    </Layout>
  )
}

export default App

