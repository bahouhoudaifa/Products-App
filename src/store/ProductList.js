import { useEffect , useState } from "react";
import Product from "./Product";


export default function ProductList(){
    const [productList , setProductList] = useState([])
    const [searchInput , setSearchInput] = useState('')
    const [categories, setCategoryList] = useState([])
    const [currentCategory, setCurrentCategory] = useState()

    const displayCategories = () => {
        return categories.map((category, key) =>
            <button key={key}
                    className={'btn ' + (currentCategory === category ? 'btn-dark' : 'btn-secondary')}
                    onClick={(e) => {
                        e.preventDefault()
                        setCurrentCategory(category)
                    }}>
                {category}
            </button>
        )
    }

    const getCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(response => setCategoryList(response))
    }

    const displayProducts = () => {
        let productsTemp = productList.filter(product => {
            console.log(product.id)
            return product.title.includes(searchInput)
            || product.description.includes(searchInput)
        })
        if (currentCategory !== undefined) {
            productsTemp = productsTemp.filter(product => {
                return product.category === currentCategory
            })
        }
        if(productsTemp.length > 0){
            return productsTemp.map((product , key)=> {
                return <Product product={product} key={key} />
            })      
        }
        else{
            return<tr>
                    <td colSpan={7}>No Items</td>
                </tr>
        }
    }

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(response => setProductList(response))
    }
    
    useEffect(() => {
       getProducts() 
       getCategories()
    },[]);

    const handleSearch = (e) => {
        e.preventDefault()
        const searchValue = document.querySelector('#search').value
        setSearchInput(searchValue)
    };


    return <div className='container-fluix mx-auto w-75 my-3'>
        <center><u><h1>Product Store</h1></u></center>
        <br />
        <form>
            <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <input type="text" id="search" className="form-control"/>
                    </div>
                    <div className="col-auto">
                        <input className='btn btn-dark mx-2' type="submit" value='Search' onClick={handleSearch}/>
                    </div>
            </div>    
            <br />
            <div className="row g-3 align-items-center">
                <div className="btn-group">
                    {displayCategories()}
                </div>
            </div>
        </form>
        <br />
        <br />
        <table className="table">
            <thead>
                <tr>
                    <th>#Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {displayProducts()}
            </tbody>
        </table>    
    </div>
}


