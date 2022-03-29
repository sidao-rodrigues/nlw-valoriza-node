import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from '../repositories/TagsRepositories'
import { classToPlain } from 'class-transformer';

class ListTagsService {
  async execute() {
    const tagsRespositories = getCustomRepository(TagsRepositories);

    const tags = tagsRespositories.find();

    return classToPlain(tags);
  }
}

export {
  ListTagsService
}