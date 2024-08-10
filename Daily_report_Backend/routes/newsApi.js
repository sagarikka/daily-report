const router=require("express").Router();
const puppeteer=require("puppeteer");

//times of india
router.get("/timesofindia",async(req,res)=>{
    const url="https://timesofindia.indiatimes.com/world"
    let browser;
    try {
        browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' },{timeout: 60000});

        const result = await page.evaluate(() => {
            const headings = document.querySelectorAll(".WavNE");
            const allHeadings = [...headings];
            return allHeadings.map(h=>h.innerHTML);
        });

        await browser.close();
        return res.json(result);
    } catch (error) {
        if (browser) {
            await browser.close();
        }
        console.error(error);
        return res.status(500).json({error:"An error occurred while scraping the times of india!"});
    }
});

//hindustan times
router.get("/hindustantimes",async (req,res)=>{
    const url="https://www.hindustantimes.com/world-news";
    let browser;
    try{
        browser=await puppeteer.launch({headless:true});
        const page=await browser.newPage();
        await page.goto(url,{waitUntil:'domcontentloaded'},{timeout: 60000});
        const result =await page.evaluate(()=>{
            const headings=document.querySelectorAll(".hdg3 a");
            const allHeadings=[...headings];
            return allHeadings.map(h=>h.innerHTML);
        });
        await browser.close();
        return res.json(result);
    }
    catch(error){
        if(browser){
           await browser.close();
        }
        console.log(error);
        return res.status(500).send("An error occur while scraping the hindustan times!")
    }
})
module.exports=router;