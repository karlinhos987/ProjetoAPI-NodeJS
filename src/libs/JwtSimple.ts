import { encode } from "jwt-simple"
import { decode } from "jwt-simple"

const _ALGORITHM = 'aes-256-cbc'
const _HASH = 'mYCE2YFy034ncm1Qf8JqN60c61a7poOP'
const _SECRET = 'jjncklasjldjasld'
const _IV = Buffer.from('PbnzHwwF0Zo77vqQ')

export class JwtSimple {
    public static createJWT(sub: object): string {
        const now = new Date()
        const payload = {
            sub,
            iat: now.getTime(),
            exp: new Date().setHours(now.getHours() + 24)
        }
        return encode(payload, _SECRET)

    }

    public static jwtValidate(req: any, res: any, next: any) {
        try {
            const auth = req.header('Authorization')
            const token = auth.split(' ')[1]
            if(!auth){
                res.status(401).json({
                    message: 'Access note authorized'
                })
            }

            if (!token) {
                res.status(401).json({
                    message: 'Access note authorized'
                })
            }
            const payload = decode(token, _SECRET)
            const now = new Date()
            if (payload.exp < now) {
                res.status(401).json({
                    message: 'Access token expired!'
                })
            }
            req.authToken = payload.sub
            next()
        } catch (error) {
            console.error('Erro on middleware authentication', error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}