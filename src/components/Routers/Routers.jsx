import { AddFlats } from "../Add Flats/addFlats";
import { AddResidents } from "../Add residents/addResidents";
import { Home } from "../Home/home";
import ResponsiveAppBar from "../Navbar/Navbar";
import { Residents } from "../Residents/residents";
import  TabPanel  from "../signup-login/signup-login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Routers = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/addResidents/"} element={<AddResidents />} />
        <Route path={"/addFlats/"} element={<AddFlats />} />
        <Route path={"/signup-login/"} element={<TabPanel />} />
        <Route path={"/residents/:flat_id"} element={<Residents />} />
      </Routes>
    </>
  );
};
