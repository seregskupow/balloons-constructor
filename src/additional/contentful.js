// import * as contentful from "contentful";

// export const client = contentful.createClient({
//     // This is the space ID. A space is like a project folder in Contentful terms
//     space: process.env.REACT_APP_SPACE_ID,
//     // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//     accessToken: process.env.REACT_APP_ACCESS_TOKEN
//   });
//   client
//   .getEntries({
//     content_type: "Balloon"
//   })
//   .then(response => this.setProducts(response.items))
//   .catch(console.error);
const query = `
{
	balloonCollection{
        items{
         id
        price
        category
        model
        src {
          url
        }
    }
  }
}
`;
export default () => {
    return new Promise((resolve, reject) => {
        fetch(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/environments/master`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
              },
              body: JSON.stringify({
                query
              })
            }
          )
          .then(res=>res.json())
          .then(response=>resolve(transformData(response.data.balloonCollection.items)))
          .catch(error=>reject(error))
    })
}

const transformData = (raw)=>{
    let data = [];
    raw.forEach(item=>{
        let category = item.category !== null ? item.category : "standart"
        data[item.model.split(',')[0]] = data[item.model.split(',')[0]] || {categories:[]}
        // var index2 = cat.map(function(e) { return e.m; }).indexOf('s');
        let categoryIndex = data[item.model.split(',')[0]].categories.map(e=> e.categoryName).indexOf(category);
        if(categoryIndex!==-1){
            data[item.model.split(',')[0]].categories[categoryIndex].imgs.push({id:item.id,src:item.src.url,price:parseInt(item.price)})
        }
        else if(categoryIndex===-1){
            data[item.model.split(',')[0]].categories.push({
                categoryName:category,
                imgs:[{id:item.id,src:item.src.url,price:parseInt(item.price)}]
            })
        }
        
    })
    return data;
}