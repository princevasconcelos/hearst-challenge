import { Request } from "express";
import { BaseController } from "./interfaces/base-controller";
import { BreedServiceInterface } from "../core/interfaces/breed-service-interface";
import { BreedModel } from "../core/models/breed-model";

export default class BreedDetailsController implements BaseController<BreedModel> {
    constructor(
        private readonly breedService: BreedServiceInterface
    ) {}

    async handle(req: Request) {
        const { id } = req.params
        return await this.breedService.loadDetails(id)
    }
}