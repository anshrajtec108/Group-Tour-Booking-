const asyncHandler=(requireHandler)=>{
    return ( req,res,next)=>{
        Promise.resolve(requireHandler(req,res,next))
        .catch((err)=>next(err))
    }
}
export default asyncHandler