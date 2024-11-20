export async function GET(params){
    const isbn=params.url.split("?")[1].split("=")[1];
    const url=`http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`;
    const res=await fetch(url);
    const data=await res.json();
    return Response.json(data)
}