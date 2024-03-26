// import img from '../assets/img/3.jpg'

export function ToyPreview({ toy }) {


    return (
        <article className="toy-card">
            <img src={toy.img} alt="toy-img" />
            <div className="toy-details pad1">
                <h4>{toy.name}</h4>
                <p>Price ${toy.price.toLocaleString()}</p>
            </div>

        </article>
    )
}