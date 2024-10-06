import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
// import './styles/dashboard/style.scss'
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout.jsx'));
const FrontendLayout = React.lazy(() => import('./layout/FrontendLayout.jsx'));

// Pages for Dashboard
const Login = React.lazy(() => import('./pages/dashboard/pages/login/Login.jsx'));
const Register = React.lazy(() => import('./pages/dashboard/pages/register/Register.jsx'));
const Page404 = React.lazy(() => import('./pages/dashboard/pages/page404/Page404.jsx'));
const Page500 = React.lazy(() => import('./pages/dashboard/pages/page500/Page500.jsx'));

// Pages for Frontend
const HomePage = React.lazy(() => import('./pages/frontend/Home'));
const AboutPage = React.lazy(() => import('./pages/frontend/AboutUsSection'));
const Blogs = React.lazy(() => import('./pages/frontend/Blogs'));
const Books = React.lazy(() => import('./pages/frontend/Books'));
const Chapter = React.lazy(() => import('./pages/frontend/Chapter'));
const Classes = React.lazy(() => import('./pages/frontend/Classes'));
const ContactUs = React.lazy(() => import('./pages/frontend/ContactUs'));
const Quote = React.lazy(() => import('./pages/frontend/Quote'));
const Services = React.lazy(() => import('./pages/frontend/Services'));
const Subject = React.lazy(() => import('./pages/frontend/Subject'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="/dashboard" element={<DefaultLayout />} />

        {/* Frontend Routes */}
        <Route path="/*" element={<FrontendLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="books" element={<Books />} />
          <Route path="chapter" element={<Chapter />} />
          <Route path="class" element={<Classes />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="quote" element={<Quote />} />
          <Route path="services" element={<Services />} />
          <Route path="subject" element={<Subject />} />
          {/* Add other frontend routes here */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
