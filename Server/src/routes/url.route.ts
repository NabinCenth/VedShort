import express from "express";
import pool from "../db/dbconfig.js";
import  codegen from "../utils/gencode.js";

const router = express.Router();
// Post Req 
router.post("/shorten", async (req, res) => {
  const randomString=codegen();
  console.log("response body",req.body.org_url);
  if (!req.body.org_url) {
    return res.status(400).json({ error: "org_url is required" });
  }
  try{
    await pool.query(
    "INSERT INTO links (org_url,short_id) VALUES ($1,$2)",
    [req.body.org_url, randomString]
  );
  return res.status(200).json({short_id: randomString});
  }
  catch(error: any){ 
    if (error.code === '23505') {
   try{
   const new_id:string=codegen();
      await pool.query(`
        INSERT INTO links (org_url,short_id) VALUES ($1,$2)
     `, [req.body.org_url, codegen()]);

        return res.status(200).json({short_id: randomString});

    }
 
   catch(retry:any){
    
    return res.status(500).json({ error: "Internal Server Error" });

   }
      } 
    else{
      console.error("Error occurred:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
 

});

//Get Req
router.get("/:short_id",async(req,res)=>{
const id = req.params.short_id;
try{
 const org_url =await pool.query("SELECT org_url FROM links WHERE short_id =$1",[id]);

res.redirect(301,org_url.rows[0]?.org_url);
}
catch(err){
  console.error("Error Occured:", err)
  res.status(500).json({ error: "Internal Server Error" });
}
});

export default router;