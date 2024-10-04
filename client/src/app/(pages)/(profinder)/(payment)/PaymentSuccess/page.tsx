import Link from 'next/link'


const PaymentSuccess = ()=>{
    return(
        <div className="mt-[85px]">
                <div className="flex justify-center items-center h-[60vh]">
                    <h2>
                        Payment success
                    </h2>
                </div>
                <button>
                    <Link href={'/service-workerlist'}>
                        back  
                    </Link>
                </button>
        </div>
  
    )
}

export default PaymentSuccess