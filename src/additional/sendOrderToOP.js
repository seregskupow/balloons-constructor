
// config.get('sendOrder')
export default async function(balloons,img){
    try{    
        let promises =[];
        balloons.map(balloon=>{
            promises.push(sendBalloon(balloon.product_id,1))
        })
        Promise.all(promises).then(()=>{
            const imgData = new FormData();
            imgData.append('image',img.toString())
            fetch('index.php?route=api/cart/addimg',{
                method:'post',
                  body:imgData                
            }).then(res=>res.json()).then(response=>console.log(response))
            // $('#cart > .cart-menu-wrapper > .cart-menu > .cart-items').load('index.php?route=common/cart/info ul li')
        })
    }catch(e){}
}
const sendBalloon =(id,quantity)=>{
    const formData  = new FormData();
    formData.append('product_id',id);
    formData.append('quantity',quantity);
    return fetch('index.php?route=checkout/cart/add',{
    method: 'post',
    body: formData
    })
}
