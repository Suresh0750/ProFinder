
import {format} from 'date-fns'
export function revenueCalculation(revenueData:any[]){
    console.log(revenueData)

    if(revenueData?.length==0) return []

    let revenue : any[] = []
    let obj  :{[key:string]:string} = {}
    revenueData?.map((data)=>{
        const date = new Date(data?.createdAt);
        const month = format(date, 'MMM');
        console.log(month)
        obj[month] = (obj[month]||0)+data?.payment
    })

    console.log(JSON.stringify(obj))
    for(let key in obj){
        revenue?.push({month:key,revenue:obj[key]})
    }
    console.log('revenue')
    console.log(JSON.stringify(revenue))

    return revenue
}


export function jobStatusService(jobData:any[]){

    if(jobData?.length==0)return [{}]
    
    const jobStatusData = [
        { name: "Completed", value: 300 },
        { name: "In Progress", value: 150 },  
        // { name: "Pending", value: 100 },
        { name: "Cancelled", value: 20 },
      ]

    let obj:{[key:string]:number} = {
        Completed : 0,
        Pending : 0,
        Cancelled : 0
    }

const status = []
const paymentData = [
            {
                "_id": "Completed",
                "value": 2
            }
        ]

paymentData?.map((data)=>{
    obj[data?._id] = data?.value
})

for(let key in obj){
    status?.push({name:key,value:obj[key]})
}
console.log(JSON.stringify(status))
return status

}


export function getWorkerDistribution(worker:any[]){
   
    
    let obj = {
        Carpenter : 0,
        Painter : 0,
        Electrician : 0,
        Tilework : 0,
        Construction : 0,
        Centring : 0,
        Fabrication :0,
        Mechanical : 0
    }
    let workerData = []
    
    worker?.map((data)=>{
        obj[data?._id] = data?.count
    })

    for(let key in obj){
        workerData?.push({trade:key,count:obj[key]})
    }

    return workerData
}