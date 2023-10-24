function Filter({ findText, setFindText }) {

    const handleText = (value) => {
        setFindText(value);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="my-10 text-center">
            <input type="text" placeholder="Filtrar nombre" value={findText} onChange={(e) => handleText(e.target.value)} 
             className="input input-bordered w-[400px]" />
        </form>
    )
}
export default Filter;