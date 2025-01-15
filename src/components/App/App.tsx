import { BrowserRouter } from "react-router-dom";
import AppRouter from "../../router/AppRouter";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.app}>
        <SideBar />
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
