import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./database/database.connect.js";

dotenv.config({ path: "./.env"})

connectDB()

.then(() => {
    console.log(`MongoDB Connected !!!`)

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listining on port ${process.env.PORT || 3000}`)
    })
})

.catch((error) => {
    console.log(error?.message)
})

