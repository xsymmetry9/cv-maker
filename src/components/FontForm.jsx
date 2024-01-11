/* eslint-disable react/prop-types */
const FontForm = ({font, handle}) =>{
    const style = `w-[80px] h-[90px] py-4 border-slate-300 rounded-md`;
    const hover = `hover:border-slate-700 hover:border-2 `;

    return(
   
        <div className='style-card mt-12 bg-stone-100 shadow shadow-sm shadow-stone-700/50 rounded-md'>
           <h2 className="font-bold text-center text-2xl pb-7 pt-3">Fonts</h2>
            <div className="group-buttons flex gap-3 justify-center">
                {font.map((item, index) =>{
                    return(
                        <button key={index} className= {`${item.isSelected ? "border-2 border-slate-700" : "border border-slate-300 "} font-${item.name} ${style} ${hover}`}
                        name={item.name}
                        onClick={handle}>
                        {item.name}</button>
                    );

                })
            }
            </div>
        </div>
    )
}
export default FontForm;