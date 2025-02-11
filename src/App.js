import '../src/assets/css/bootstrap.min.css'
import '../src/assets/css/style.css'
// import './App.css';
import FormComponent from './components/FormComponent';
import logo from './assets/images/logo.png'
import { ConfigProvider } from 'antd';
import { Router, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';

function App() {
  const router = createBrowserRouter([
    {
      index:true,
      element:<Home />
     
    }
  ]);

  return (
   <>

   <ConfigProvider 
   theme={{
    token:{
    colorPrimary:'#1a2871'   
    }
    
   }}
   >

    <RouterProvider router={router}/>
  

   </ConfigProvider>

  
   
   </>
  );
}

export default App;
