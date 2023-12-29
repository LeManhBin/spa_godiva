import express from 'express'
import path from "path";
import cors from 'cors';
import bodyParser from 'body-parser'
import handleConnectDB from './configs/connectDB'
import serviceRouter from './routes/serviceRoute'
import authRouter from './routes/authRouter'
import packageRouter from './routes/servicePackage'
import bannerRouter from './routes/mainBannerRouter'
import staffRouter from './routes/staffRouter'
import newsRouter from './routes/newsRouter'
import customerRouter from './routes/customerRouter'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

handleConnectDB()

app.use("/image", express.static(path.join(__dirname, "./public/images")))

app.use('/api', serviceRouter)
app.use('/api/auth', authRouter) 
app.use('/api', packageRouter) 
app.use('/api', bannerRouter) 
app.use('/api', staffRouter) 
app.use('/api', newsRouter) 
app.use('/api', customerRouter) 

app.listen(8080,() => {
    console.log(`Server is running on port 8080`);
})
