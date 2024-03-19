import expressApp from "./expressApp"
import "dotenv/config";

const PORT = process.env.PORT || 8001;

export const StartServer = async () => {

    expressApp.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}`);
    })

    process.on("uncaughtException", async (error) => {
        console.log(error);
        process.exit(1)
    })
}

StartServer().then(() => {
    console.log("Server is up");

})