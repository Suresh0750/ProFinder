



export interface RequestData {
    service : string,
    worker :string,
    preferredDate : string,
    preferredTime : number | string,
    servicelocation : string,
    AdditionalNotes? : string,
    userId : string,
    workerId : string,
    isAccept ?: string,
    additionalNotes?:string
}