import env from "../../config/env";
import { BreedRepositoryInterface } from "../core/interfaces/breed-repository-interface";
import { BreedModel } from "../core/models/breed-model";
import { redisHelper } from "../helpers/redis-helper";

export class BreedRepository implements BreedRepositoryInterface {
    // @todo: fazer a parte do /brands/id agora... fazer mais uns testes no cache do redis
    // tenta fazer a pipeline do github funcionar logo tb
    // ver essa parada aqui tb https://github.com/princevasconcelos/movies-node/blob/master/server/bin/www.js
    async load(randomize: boolean, limit?: number) {
        console.log('BreedRepository.load')
        let breeds = await this.fetchBreeds()

        if (randomize) {
            breeds = this.randomizeArray(breeds)
        }

        if (!limit) return breeds
        return breeds.slice(0, limit)
    }

    async loadByName(name: string, randomize: boolean, limit?: number) {
        console.log('BreedRepository.loadByName')
        let breeds = await (await this.fetchBreeds())
            .filter(breed => breed.name.toLowerCase().includes(name.toLowerCase()))

        if (randomize) {
            breeds = this.randomizeArray(breeds)
        }

        if (!limit) return breeds
        return breeds.slice(0, limit)
    }

    async loadById(id: string) {
        return await this.fetchBreedById(id)
    }

    async fetchBreeds() {
        let breeds = await redisHelper.get<BreedModel[]>('breeds')
        if (breeds) {
            console.log('BreedRepository.fetchBreeds - from cache')
            return breeds
        }

        const result = await fetch(`${env.CAP_API_URL}/breeds`, {
            headers: {
                'x-api-key': env.CAT_API_KEY
            }
        })

        breeds = await result.json()
        await redisHelper.set('breeds', breeds)
        console.log('BreedRepository.fetchBreeds - from API')
        return breeds
    }

    async fetchBreedById(id: string) {
        let breed = (await redisHelper.get<BreedModel[]>('breeds'))?.find(b => b.id === id)
        if (breed) {
            console.log('BreedRepository.fetchBreedById - from cache')
            return breed
        }

        const result = await fetch(`${env.CAP_API_URL}/breeds/${id}`, {
            headers: {
                'x-api-key': env.CAT_API_KEY
            }
        })
        breed = await result.json() as BreedModel
        console.log('BreedRepository.fetchBreedById - from API')

        return breed
    }

    randomizeArray(array: BreedModel[]) {
        return array.sort(() => Math.random() - 0.5)
    }
}