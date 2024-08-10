const router = require("express").Router();
const passport=require("passport");

router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);
module.exports=router;