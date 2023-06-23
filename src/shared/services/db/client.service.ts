import { UpdateQuery } from "mongoose";

import { IClientDocument, IGetClientQuery } from "@client/interfaces/client.interface";
import { ClientModel } from "@client/models/client.model";

class ClientService {
  public async addClientData(data: IClientDocument): Promise<void> {
    await ClientModel.create(data);
  }

  public async getClients(query: IGetClientQuery, skip = 0, limit = 0, sort: Record<string, 1 | -1>): Promise<IClientDocument[]> {
    const clients: IClientDocument[] = await ClientModel.aggregate([
      { $match: query },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit }
    ]);
    return clients;
  }

  public async getClientById(clientId: string): Promise<IClientDocument> {
    const client: IClientDocument = (await ClientModel.findOne({ clientId }).populate("eventId")) as IClientDocument;
    return client;
  }

  public async clientsCount(): Promise<number> {
    const count: number = await ClientModel.find({}).countDocuments();
    return count;
  }

  public async deleteClient(clientId: string): Promise<IClientDocument> {
    const deleteClient: IClientDocument = (await ClientModel.deleteOne({ _id: clientId })) as unknown as IClientDocument;
    return deleteClient;
  }

  public async editClient(clientId: string, updatedClient: IClientDocument): Promise<void> {
    const updateClient: UpdateQuery<IClientDocument> = ClientModel.updateOne({ _id: clientId }, { $set: updatedClient });
    await Promise.all([updateClient]);
  }
}

export const clientService: ClientService = new ClientService();
