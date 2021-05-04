module.exports={
    serverError(res,err) {
        console.log(err)
        res.status(400).json({
            message: "Server Error"
        })
    },
    resourceError(res,message){
        res.status(402).json({
            message
        })
    }
}