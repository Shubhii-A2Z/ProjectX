import razorpay from "razorpay";
import serverConfig from "./server.config";

const instance=new razorpay({
    key_id: serverConfig.RAZORPAY_KEY_ID as string,
    key_secret: serverConfig.RAZORPAY_KEY_SECRET as string
})

export default instance;