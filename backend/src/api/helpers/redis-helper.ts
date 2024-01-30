import { RedisClientType, createClient } from 'redis'
import env from '../../config/env'

class RedisHelper {
    private static readonly client: RedisClientType = createClient({
        url: env.REDIS_URL
    })

    private async connect() {
        if (RedisHelper.client.isOpen) return
        await RedisHelper.client.connect()
    }

    async get<T>(key: string) {
        try {
            if (!RedisHelper.client.isOpen) {
                await this.connect()
            }

            return JSON.parse(await RedisHelper.client.get(key)) as T
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async set(key: string, value: any) {
        try {
            if (!RedisHelper.client.isOpen) {
                await this.connect()
            }

            await RedisHelper.client.set(key, JSON.stringify(value), {
                EX: env.REDIS_CACHE_EXPIRATION as number
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const redisHelper = new RedisHelper()