const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const app = express();


const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/", (req,res)=>{
    res.render("index");
});
app.get("/read",async (req,res)=>{
    let allusers = await userModel.find();
    res.render("read",{user:allusers});
});
app.post("/create",async (req,res)=>{
    let {name, email, image}= req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    console.log("✅ User created:", createdUser);

    res.redirect("/read");
})
app.get("/delete/:id", async (req,res)=>{
   let users= await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read");
})
app.listen( port, ()=>{
     console.log(`Server listening at http://localhost:${port}`);
})