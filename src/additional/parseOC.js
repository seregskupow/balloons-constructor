import config from '../config/config.json'
export default async function(){
    const response = await fetch("http://reco.fun:8080/sharlar-shop/index.php?route=api/product");
    const products = await response.json();
    let data = {};
    products.products.forEach(item=>{
        let category = item.model.split(',')[1] ? item.model.split(',')[1] : "standart"
        data[item.model.split(',')[0]] = data[item.model.split(',')[0]] || {categories:[]}
        // var index2 = cat.map(function(e) { return e.m; }).indexOf('s');
        let categoryIndex = data[item.model.split(',')[0]].categories.map(e=> e.categoryName).indexOf(category);
        if(categoryIndex!==-1){
            data[item.model.split(',')[0]].categories[categoryIndex].imgs.push({id:item.product_id,src:item.thumb,price:parseInt(item.price.replace(/₴|грн./g,""))})
        }
        else if(categoryIndex===-1){
            data[item.model.split(',')[0]].categories.push({
                categoryName:category,
                imgs:[{id:item.product_id,src:item.thumb,price:parseInt(item.price.replace(/₴|грн./g,""))}]
            })
        }
        
    })
    return data
    
}