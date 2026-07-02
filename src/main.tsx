// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import { appRoutes } from './routes/appRoutes.tsx'
// import { Provider } from 'react-redux'
// import { store } from './store/store.ts'
// useEffect(() => {
//   const handlePageShow = (event) => {
//     if (event.persisted) {
//       // Page was restored from bfcache — force a fresh load
//       // so Redux state, WebSocket, and route guards are all re-initialized
//       window.location.reload();
//     }
//   };
//   window.addEventListener("pageshow", handlePageShow);
//   return () => window.removeEventListener("pageshow", handlePageShow);
// }, []);
// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//       <Provider store={store}>
//     <RouterProvider router={appRoutes} />
//     </Provider>
//    </StrictMode>
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './routes/appRoutes.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
    </Provider>
  </StrictMode>
)