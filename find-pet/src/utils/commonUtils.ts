export const getRandom32Char = (): string => {
  return Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
}

export const getFilesPath = (
  filesArray: Array<Express.Multer.File>
): string[] => {
  return filesArray.map((el) => el.path)
}
