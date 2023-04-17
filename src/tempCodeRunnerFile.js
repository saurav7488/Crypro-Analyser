  import React from 'react'
  import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
  import Homepage from './component/Homepage'
  import Header from './component/Header'
  import Coinspage from './component/Coinspage'
  import { styled } from '@mui/system';
  const App = () => {
    const MyComponent = styled('div')({
        backgroundColor:'black',
        color:'white',
        minHeight:'100vh',
    });
    
    return (
        <Router>  
          <MyComponent>
            <Header/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/coins/:id' element={<Coinspage/>}/>
            </Routes>
            </MyComponent>
        </Router>
    )
  }

  export default App
