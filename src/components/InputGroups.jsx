const ListGroups = (items) =>{
    return(
        <label className={items.class} key={items.id} htmlFor = {items.htmlFor}>
            {items.labelName != null && <span className='block'>{items.labelName}</span>}
                {
                    items.type !== "textarea" ? 
                        <input
                            id= {items.id} 
                            name= {items.name}
                            type={items.type} 
                            className = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value = {items.data}
                            onChange={items.handle}
                            placeholder={items.placeholder}>
                        </input> : <textarea 
                            value = {items.data}
                            rows = {items.rows}
                            cols = {items.cols}
                            onChange = {items.handle}
                            className= "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"> 
                        </textarea>
                }
        </label>
    )
}

export default ListGroups;