import imageSource from '../images/sala-cine.jpg';

function Logo() {
    return (
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ">
                <img src={imageSource} alt="Logo" />
            </div>
        </label>
    )
}

export default Logo