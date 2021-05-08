module.exports={
    serverError(res,err) {
        console.log(err)
        res.status(400).json({
            message: "Server Error"
        })
    },
}