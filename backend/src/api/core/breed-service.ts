import { BreedListLoadParams, BreedServiceInterface } from "./interfaces/breed-service-interface";

export class BreedService implements BreedServiceInterface {
    constructor(private readonly breedRepository: any) {}

    async loadList(params: BreedListLoadParams) {
        console.log('BreedService.loadList', params)
        const { limit, name, randomize } = params;
        const breeds = await (params?.name
            ? this.breedRepository.loadByName(name, randomize, limit)
            : this.breedRepository.load(randomize, limit))

        return breeds
    }

    async loadDetails(id: string) {
        return await this.breedRepository.loadById(id)
    }
}