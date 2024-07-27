import { Routes, Route, useLocation } from 'react-router-dom'
import { Home, Details } from '../pages'

const AppRouter = () => {
    const location = useLocation()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
        </Routes>
    )
}

export default AppRouter
