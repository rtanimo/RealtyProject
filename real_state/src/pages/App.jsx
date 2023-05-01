import { Routes, Route } from "react-router-dom"
import Home from './Home'
import Properties from "./Properties"
import SaleRecords from "./SaleRecords"
import Assessments from "./Assessments"
import Navigation from "../components/Navigation"
import Realtors from "./Realtors"
import Search from "./Search"
import SellProperty from "./SellProperty"

export default function App() {
  return(
    <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/realtors" element={<Realtors />} />
      <Route path="/search" element={<Search />} />
      <Route path="/sell" element={<SellProperty />} />
    </Routes>
    </>
  )
}