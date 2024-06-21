export interface Post {
  //create variable
  title:string;
  permalink:string;
  category : {
    categoryId:string,
    category:string
  },
    postImgPath:string,
    postImg?: string,
    excerpt:string,
    content : string,
    isFeatured:boolean,
    views:number,
    status:string,
    createdAt:Date
}
