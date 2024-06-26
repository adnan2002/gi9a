


const ShopBanner = ({title}) =>{
    return(
        <div className="relative h-48 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/shop-bg.jpg')" }}>
        <span className="text-black font-bold text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
          {title}
        </span>
      </div>
    )
}

export default ShopBanner