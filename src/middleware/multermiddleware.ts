import multer from 'multer'
import type{Request} from 'express'
const storage=multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb:any) {
        const allowedtypes=['image/jpeg','image/jpg','image/png']
        if(!allowedtypes.includes(file.mimetype))
        {
            cb(new Error("File type not supported"))
        }
        cb(null,"./src/storage")
    },

    filename:function(req:Request,file:Express.Multer.File,cb:any)
    {
        cb(null,Date.now() + "-"+ file.originalname)
    }
})

export {
    multer,storage
}