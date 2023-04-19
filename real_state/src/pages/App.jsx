import { Routes, Route } from "react-router-dom"
import Home from './Home'
import Properties from "./Properties"
import SaleRecords from "./SaleRecords"
import Assessments from "./Assessments"
import Navigation from "../components/Navigation"
import Realtors from "./Realtors"

export default function App() {
  return(
    <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property" element={<Properties />} />
      <Route path="/sales-records" element={<SaleRecords />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/realtors" element={<Realtors />} />
    </Routes>
    </>
  )
}