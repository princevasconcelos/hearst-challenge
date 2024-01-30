import { BreedModel } from "../models/breed-model";

export type BreedListLoadParams = {
    limit?: number
    name?: string
    randomize?: boolean
}

export interface BreedServiceInterface {
    loadList: (params: BreedListLoadParams) => Promise<BreedModel[]>
    loadDetails: (id: string) => Promise<BreedModel>
}