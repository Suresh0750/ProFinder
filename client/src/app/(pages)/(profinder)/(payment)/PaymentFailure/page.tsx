import Link from 'next/link'


const PaymentFailure = ()=>{

    return(
        <div className="mt-[85px]">
                <div className="flex justify-center items-center h-[60vh]">
                <h2>Payment failure try again</h2>
                </div>
                <button>
                    <Link href={'/service-workerlist'}>
                        back  
                    </Link>
                </button>
        </div>
  
    )
}

export default PaymentFailure