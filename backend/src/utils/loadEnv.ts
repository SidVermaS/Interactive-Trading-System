import dotenv from 'dotenv'
import { EnvVariablesI } from '../types/common/env'
dotenv.config()

const EnvVariables: EnvVariablesI = process.env as unknown as EnvVariablesI

export default EnvVariables