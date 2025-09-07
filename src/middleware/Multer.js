import multer from "multer"
import fs from "fs"

export const allowedExtension ={
  image :["image/png","image/jpeg","image/webp"],
  pdf:["application/pdf"]
}

export const MulterLocal = ({ customPath="general" , customExtension = [] } = {} ) => {

  const fullPath=`uploads/${customPath}`
  if(!fs.existsSync(fullPath)){
    fs.mkdirSync(fullPath,{recursive:true})
  }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fullPath)
  },
  filename: function (req, file, cb) {
    console.log(file);
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,file.originalname+ "_"+uniqueSuffix)
  }
})

function fileFilter (req, file, cb) {

  if(!customExtension.includes(file.mimetype)){
  cb(new Error('invalid'),false)
  }else{
  cb(null, true)

  }
}

const upload = multer({ storage,fileFilter })
return upload


}



export const MulterHost = ({ customExtension = [] } = {} ) => {

  
const storage = multer.diskStorage({ })

function fileFilter (req, file, cb) {

  if(!customExtension.includes(file.mimetype)){
  cb(new Error('invalid'))
  }else{
  cb(null, true)

  }
}

const upload = multer({ storage,fileFilter })
return upload


}