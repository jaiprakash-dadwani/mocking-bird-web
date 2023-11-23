import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Suspense} from "react";
import Home from "../home/Home.tsx";
import ConsoleHome from "../consoleHome/ConsoleHome.tsx";
import RulesHome from "../rules/RulesHome.tsx";

function App() {
  return (
        <Router>
            <Suspense fallback={<div />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/console" element={<ConsoleHome />} />
                    <Route path="/console/edit" element={<RulesHome />} />
                </Routes>
            </Suspense>
        </Router>
  );
}

export default App
