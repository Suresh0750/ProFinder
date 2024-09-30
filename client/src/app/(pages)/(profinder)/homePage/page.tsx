// "use client"



import Image from 'next/image';
import Link from 'next/link'
import Navbar from '@/components/Navbar/page'
import SliderSection from '@/components/SliderSection';

const Home = () => {
  // 
 
  const expertise = [
    {
      title: "Innovation of Metallurgy",
      description: "Lorem ipsum dolor sit amet consectetur.",
      imageSrc: "https://source.unsplash.com/400x300/?metallurgy",
    },
    {
      title: "Industry Society Value",
      description: "Lorem ipsum dolor sit amet consectetur.",
      imageSrc: "https://source.unsplash.com/400x300/?industry",
    },
    {
      title: "End Building Fabrications",
      description: "Lorem ipsum dolor sit amet consectetur.",
      imageSrc: "https://source.unsplash.com/400x300/?fabrication",
    },
  ];


  return (
    <div>
    
      {/* Slider Section */}
     <SliderSection />
      {/* Services Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6">Modern Elegant Design Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <Image src="https://source.unsplash.com/400x300/?general,contract" alt="Service 1" width={400} height={300} />
              <h3 className="text-xl font-bold mt-4">Implement General Contract</h3>
              <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <Image src="https://source.unsplash.com/400x300/?building,renovation" alt="Service 2" width={400} height={300} />
              <h3 className="text-xl font-bold mt-4">Building Renovation</h3>
              <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <Image src="https://source.unsplash.com/400x300/?construction,building" alt="Service 3" width={400} height={300} />
              <h3 className="text-xl font-bold mt-4">Building Construction</h3>
              <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </section>
    {/* New Missing Section: Explore Our Expertise */}
    <section id="expertise" className="py-16 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold">Explore Our Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {expertise.map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg">
                <Image src={item.imageSrc} alt={item.title} width={400} height={300} className="rounded-t-lg" />
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p>{item.description}</p>
                </div>
                </div>
            ))}
            </div>
        </section>
      {/* Industry Performance Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="md:w-1/2">
            <Image src="https://source.unsplash.com/600x400/?construction,worker" alt="Performance" width={600} height={400} className="rounded" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">What About Our Industry Performance</h2>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate necessitatibus impedit, dignissimos adipisci, debitis nam voluptas vero. Rerum, dolorem.</p>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded">Read More</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
