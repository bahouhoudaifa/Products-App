export default function Rating({count,rate}){
    return <>
        <span className="badge badge-pill bg-dark">{rate}/5 | {count} of people </span>
    </>
}