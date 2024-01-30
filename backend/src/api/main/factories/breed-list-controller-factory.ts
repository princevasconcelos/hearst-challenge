import { BreedListController } from "../../controllers/breed-list-controller"
import { BreedService } from "../../core/breed-service"
import { BreedRepository } from "../../repositories/breed-repository"

export const makeBreedListController = () => {
    const breedRepository = new BreedRepository()
    const breedService = new BreedService(breedRepository)
    return new BreedListController(breedService)
}