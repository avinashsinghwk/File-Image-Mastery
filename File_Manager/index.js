const fs = require('fs').promises;
const path = require('path');

let files_path = path.join(__dirname, 'files');
let all_Files = []

async function filesCollecotr() {
    try {
        all_Files = await fs.readdir(files_path)
    }
    catch (err) {
        throw new Error('Give a valid path')
    }
}

async function fileChecker(folderName) {
    let stat = await fs.lstat(folderName)
    return stat.isFile()
}

async function folderMaker(files) {
    for (let i = 0; i < files.length; i++) {
        let folderName = path.join(files_path, files[i])
        let isfile = await fileChecker(folderName)
        if (isfile) {
            folderName = path.join(files_path, `${files[i].slice(files[i].lastIndexOf('.')+1)}_Files`)
            try {
                await fs.open(folderName)
            } catch (err) {
                try {
                    await fs.mkdir(folderName)
                } catch (err) {
                    throw new Error('Unable to create folders')
                }
            }
        }
    }
}

async function filesMover(files) {
    for (let i = 0; i < files.length; i++) {
        let oldPath = path.join(files_path, files[i])
        let isfile = await fileChecker(oldPath)
        let newPath = path.join(files_path, `${files[i].slice(files[i].lastIndexOf('.')+1)}_Files`, files[i])
        if (isfile) {
            try{
               await fs.rename(oldPath, newPath)
            }catch(err){
                throw new Error('Unable to move files')
            }
        }
    }

}

async function main() {
    await filesCollecotr()
    await folderMaker(all_Files)
    await filesMover(all_Files)
}

main()