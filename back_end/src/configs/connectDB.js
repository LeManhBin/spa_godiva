import mongoose from "mongoose";

const handleConnectDB = () => {
    mongoose.connect('mongodb+srv://pacmam2k1:godiva123@cluster0.010p19e.mongodb.net/').then(() => {
        console.log('Connect database success');
    }).catch((error) => {
        console.log(error.message);
    })
}

export default handleConnectDB