
import mechanicImage from '../../../public/images/Admin/category/mechanic.jpg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import './table.module.css'

export default function Table(){

  let arr = [1, 2, 3, 4, 5, 6, 6, 7, 8];

  return(
    <table className='w-full table-fixed'>
                            <thead className="bg-gray-800 text-white sticky top-0">
                                <tr>
                                    <th className='w-1/12 px-4 py-2'>Id</th>
                                    <th className='w-2/12 px-4 py-2'>Image</th>
                                    <th className='w-3/12 px-4 py-2'>Category</th>
                                    <th className='w-2/12 px-4 py-2'>List/Unlist</th>
                                    <th className='w-2/12 px-4 py-2'>Edit</th>
                                    <th className='w-2/12 px-4 py-2'>Delete</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td colSpan={6}>
                                        <div className='max-h-[20rem] overflow-y-auto scrollbar-hide' id='scrollBar'>
                                            <table className='w-full table-fixed'>
                                                <tbody className='text-white mt-2'>
                                                    {arr.map((val, i) => (
                                                        <tr key={i}>
                                                            <td className='text-center w-1/12'>1</td>
                                                            <td className='text-center w-full flex justify-center items-center'>
                                                                <div className='w-12 h-12'>
                                                                    <Image src={mechanicImage} alt='mechanic' />
                                                                </div>
                                                            </td>
                                                            <td className='text-center w-3/12'>Mechanic</td>
                                                            <td className='text-center w-2/12'>
                                                                <button className='text-white text-center bg-[#FDE047] p-2 px-7 cursor-pointer rounded'>list</button>
                                                            </td>
                                                            <td className='text-center w-2/12 '>
                                                                <FontAwesomeIcon icon={faPen} style={{ color: '#1975d1',cursor:"pointer" }} />
                                                            </td>
                                                            <td className='text-center w-2/12 cursor-pointer'>
                                                                <DeleteOutlineIcon style={{color:'#D32F2F',cursor:"pointer"}}/>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
  )
}