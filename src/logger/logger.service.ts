import { Injectable, ConsoleLogger } from '@nestjs/common'
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from 'fs'
import { join } from 'path'
const MAX_LOG_FILE_SIZE = 50000
@Injectable()
export class MyLogger extends ConsoleLogger {
  private logFileIndex = 0
  log(message: string, context: string) {
    const data = `${context}\t${message}\n`
    this.writeFile(data, 'logFile')
    super.log(message, context)
  }

  error(message: any, context?: string) {
    const data = `${context}\t${message}\n`
    this.writeFile(data, 'errorFile')
    super.log(message, context)
  }

  writeFile(message: string, fileName: string) {
    const logFile = join(`./logs/${fileName}.log`)
    if (existsSync(logFile) && this.isFileMaxSize(logFile)) {
      renameSync(logFile, join(`./${fileName}-${this.logFileIndex}.log`))
      this.logFileIndex += 1
    }
    if (!existsSync('./logs')) {
      mkdirSync('./logs')
    }
    const writeStream = createWriteStream(logFile, { flags: 'a+' })
    writeStream.write(`${message}\n`)
  }

  getFileSize(fileName: string): number {
    const stats = statSync(fileName)
    return stats.size
  }

  isFileMaxSize(fileName: string): boolean {
    return this.getFileSize(fileName) > MAX_LOG_FILE_SIZE ? true : false
  }
}
