import Navbar from './components/Navbar'
import  CardHover from './components/CardElement'
import FAQ from './components/faq'
import Header from './components/Header'
import { Box } from '@mui/material'
import Footer from './components/Footer'



const Home = () => {

    return (
        <>
            <Box sx={{ bgcolor: "#10170B", paddingBottom:"100px"}}>

                <Navbar />
                <Header />
                < CardHover/>
                <FAQ/>
            </Box>
            <Footer />

        </>
    )
}

export default Home