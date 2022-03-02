import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import Form from "../pages/form/Form";
// динамические компоненты должны быть после статических
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
              <Route path="auth" element={<Form />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

App.propTypes = {
  onCharSelected: PropTypes.func,
};

export default App;
