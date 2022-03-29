import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UserRepositories } from '../repositories/UserRepositories';

interface ICreateRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentsService {
  async execute({ tag_id, user_sender, user_receiver, message }: ICreateRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRespositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect User Receiver');
    }

    const userReceiverExists = usersRespositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists!');
    }

    const compliments = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliments);

    return compliments;

  }
}

export { CreateComplimentsService }