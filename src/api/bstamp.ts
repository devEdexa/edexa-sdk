import { EdexaSettings, Network } from '../types/types'
import axios from 'axios'
import { EdexaConfig } from './config'
import { addStamp } from '../internal/bstamp-api'
import { API_VERSION, DEFAULT_NETWORK } from '../util/constant'

export interface Ibstamp {
  id: string
  hash: string
  txId: string
  code: string
  filename: string
}

export interface RawBstamp {
  id: string
  hash: string
  txId: string
  code: string
  filename: string
}

export class Bstamp {
  readonly config: EdexaConfig

  constructor(settings?: EdexaSettings) {
    this.config = new EdexaConfig(settings)
  }

  addStamp(data: any, config: any): Promise<any> {
    return addStamp(this.config, data, config)
  }
}

const settings = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxLzlmMTk2dXlQWHg3dS9PMWVyM3pYSFVoQmFROXNiaDMyZFRpKytpNUhKaFBzVHduRmt4QUpvdnh6UHhYMENCbDNYK2xqcUdiSzlZc3dML3BOZUEyS2ZIc1ppblNzZUlyZVFSTThqVWtrNzVGU0JWWnJRNE82VlEyWGFtdDRsTUhOWUFyeXJvZGczSFNoQ00vYnorVFRXdlRCaW54K1JkeUdYUldiSis0dllxbHhFd2taYkFVUWZFVnBuV0o4b09JZ1d6ZUxxanNsQVJwdGxKL1pnYTBERGh6cFdKMVJFVElJPSIsImlhdCI6MTY4MzgwNzM0OCwiZXhwIjoxNzAxODA3MzQ4fQ.V0_KiPz1jfEpcP8xUqqWvEx-iEfwiRGBXSqiWZunTQM',
  network: DEFAULT_NETWORK,
}

const bStamp = new Bstamp(settings)
const data = {
  hash: '6d6db6c25841a882ba86ce31fa13dfds64der78d912351e8e3411369a857d87babf1et4',
  filename: 'test.txt',
  isPrivate: true,
}
try {
  bStamp.addStamp(data, {}).then((data: any) => {
    console.log('data', data)
  })
} catch (error) {
  console.log(error)
}
