import { BreedModel } from "../models/breed-model"

export interface BreedRepositoryInterface {
    load: (randomize: boolean, limit?: number) => Promise<BreedModel[]>
    loadByName: (name: string, randomize: boolean, limit?: number) => Promise<BreedModel[]>
    loadById: (id: string) => Promise<BreedModel>
}
