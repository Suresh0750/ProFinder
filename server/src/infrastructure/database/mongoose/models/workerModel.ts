import { Document, model, Schema } from "mongoose";
import {PersonalInformation, ProfessionInformation} from '../../../../domain/entities/Worker'

const workerSchema = new Schema<PersonalInformation & ProfessionInformation>({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },  
    EmailAddress: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Profile: { type: String, default: "" },
    Category: { type: String, required: true },
    Country: { type: String, required: true },
    StreetAddress: { type: String, required: true },
    State: { type: String, required: true },
    City: { type: String, required: true },
    Apt: { type: String, default: "" },
    Identity: { type: String, required: true },
    PostalCode: { type: String, required: true },  
    WorkerImage: [{ type: String }], 
    reviews: [{ type: String }], 
    isVerified : {type:Boolean, default:false}
}, { timestamps: true });

const WorkerModel = model<PersonalInformation & ProfessionInformation & Document>('WorkerCollection', workerSchema);

export { WorkerModel };
