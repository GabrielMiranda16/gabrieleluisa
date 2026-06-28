import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeddingPage from './pages/WeddingPage'
import GiftListPage from './pages/GiftListPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/presentes" element={<GiftListPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
