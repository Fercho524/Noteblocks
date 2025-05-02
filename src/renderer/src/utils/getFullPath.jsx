export const getFullPath = async (fileName) => {
    const currentDir = await window.api.getCurrentDir();
    const filePath = await window.api.pathJoin(currentDir,fileName)
    return { currentDir, filePath }
}