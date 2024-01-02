import myImage from '../assets/gary.png'
const PersonalImage = () =>{
    return(
        <>
            <div className='mx-1 block rounded-full w-[200px] border-4 border-slate-700'>
                <img className= "object-cover object-top w-[200px] h-[200px] rounded-full" src = {myImage} alt="my image" />
            </div>
        </>
    )
}

export default PersonalImage;